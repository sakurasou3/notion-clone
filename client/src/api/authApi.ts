import axiosClient from "./axiosClient";
import { User } from "./types/auth";

interface RegisterParam {
  username: string;
  password: string;
  confirmPassword: string;
}

interface LoginParam {
  username: string;
  password: string;
}

interface Response {
  token: string;
}

interface UserResponse {
  user: User;
}
export const authApi = {
  register: (params: RegisterParam): Promise<Response> =>
    axiosClient.post("auth/register", params),
  login: (params: LoginParam): Promise<Response> =>
    axiosClient.post("auth/login", params),
  verifyToken: (): Promise<UserResponse> =>
    axiosClient.post("auth/verify-token"),
};
