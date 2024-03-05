import axiosClient from "./axiosClient";

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
export const authApi = {
  register: (params: RegisterParam): Promise<Response> =>
    axiosClient.post("auth/register", params),
  login: (params: LoginParam): Promise<Response> =>
    axiosClient.post("auth/login", params),
};
