export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
}

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type MeResponse = {
  success: boolean;
  data: User;
};
