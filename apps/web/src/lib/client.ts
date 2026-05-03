import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import logger from './logger';

// ─── Types ─────────────────────────────────────────────────────────────

export type ApiErrorResponse = {
  message?: string;
  success?: boolean;
};

export type RefreshResponse = {
  success: boolean;
  data: {
    accessToken: string;
  };
};

// ─── Type Guard ────────────────────────────────────────────────────────

const isApiError = (data: unknown): data is ApiErrorResponse => {
  return typeof data === 'object' && data !== null && 'message' in data;
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
  if (accessToken) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

// ─── Response Interceptor ──────────────────────────────────────────────

client.interceptors.response.use(
  (res) => res,

  async (error: AxiosError<unknown>) => {
    if (!error.config) {
      return Promise.reject(new Error('Unexpected error'));
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;
    const url = originalRequest.url ?? '';
    const responseData = error.response?.data;

    // ─── Extract message safely ────────────────────────────────────────
    const message = isApiError(responseData)
      ? (responseData.message ?? 'Something went wrong')
      : error.message || 'Something went wrong';

    // ─── Auth route guard ─────────────────────────────────────────────
    const isAuthRoute =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh');

    // ─── Refresh Logic ────────────────────────────────────────────────
    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshClient
            .post<RefreshResponse>('/auth/refresh')
            .then((res) => res.data);
        }

        const data = await refreshPromise;
        refreshPromise = null;

        setAccessToken(data.data.accessToken);

        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }

        originalRequest.headers.set(
          'Authorization',
          `Bearer ${data.data.accessToken}`,
        );

        return client(originalRequest);
      } catch (err) {
        refreshPromise = null;
        setAccessToken(null);

        logger.error('Refresh Token Failed', { err });

        return Promise.reject(
          err instanceof Error ? err : new Error('Refresh failed'),
        );
      }
    }

    // ─── Log Error ────────────────────────────────────────────────────
    logger.error('API Error', {
      status,
      message,
      url,
      data: responseData,
    });

    return Promise.reject(error);
  },
);

export default client;
