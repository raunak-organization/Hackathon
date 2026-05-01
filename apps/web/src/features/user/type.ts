export interface UpdateNamePayload {
  name: string;
}

export interface UpdateEmailPayload {
  email: string;
}

export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequestPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  token: string;
  newPassword: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface SuccessMessageResponse {
  message: string;
}
