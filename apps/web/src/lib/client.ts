import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import logger from './logger';

// ─── Types ─────────────────────────────────────────────────────────────

type ApiErrorResponse = {
  message?: string;
  success?: boolean;
};

type RefreshResponse = {
  accessToken: string;
};

// ─── Type Guard ────────────────────────────────────────────────────────

const isApiError = (data: unknown): data is ApiErrorResponse => {
  return typeof data === 'object' && data !== null && 'message' in data;
};

type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// ─── Token State ───────────────────────────────────────────────────────

let accessToken: string | null = null;
let refreshPromise: Promise<RefreshResponse> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// ─── Axios Instances ───────────────────────────────────────────────────

const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const refreshClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ─── Request Interceptor ───────────────────────────────────────────────

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers) config.headers = new AxiosHeaders();
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

// ─── Response Interceptor ──────────────────────────────────────────────

client.interceptors.response.use(
  (res) => res,

  async (error: AxiosError<unknown>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(
        error instanceof Error ? error : new Error('Request Failed'),
      );
    }

    const status = error.response?.status;
    const url = originalRequest.url ?? '';

    // ─── Auth route guard ─────────────────────────────────────────────
    const isAuthRoute = ['/auth/login', '/auth/register', '/auth/refresh'].some(
      (route) => url.includes(route),
    );

    const message = isApiError(error.response?.data)
      ? (error.response.data.message ?? 'Something went wrong')
      : (error.message ?? 'Something went wrong');

    // ─── Refresh Logic ────────────────────────────────────────────────
    if (status === 401 && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshClient
            .post<RefreshResponse>('/auth/refresh')
            .then((res) => res.data);
        }

        const data = await refreshPromise;
        refreshPromise = null;

        setAccessToken(data.accessToken);

        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }

        originalRequest.headers.set(
          'Authorization',
          `Bearer ${data.accessToken}`,
        );

        return client(originalRequest);
      } catch (err) {
        refreshPromise = null;
        setAccessToken(null);

        logger.error('Refresh Token Failed', { err });

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(
          err instanceof Error ? err : new Error('Refresh Token Failed'),
        );
      }
    }

    logger.error('API Error', {
      status,
      message,
      url,
      data: error.response?.data,
    });

    return Promise.reject(new Error(message));
  },
);

export default client;
