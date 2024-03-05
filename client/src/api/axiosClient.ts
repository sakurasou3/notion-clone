import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3500/api/v1";

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// 接続前の前処理
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers.set("Content-Type", "application/json");
    config.headers.set("Authorization", `Bearer ${getToken()}`);
    return config;
  }
);

// 接続後の処理
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error.response;
  }
);

export default axiosClient;
