export interface LoginResponse {
  err: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  }
}
