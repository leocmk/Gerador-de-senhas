export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordRequest {
  email: string;
}

export interface IResetPasswordConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: IUser;
  token?: string;
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
