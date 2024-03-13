import axiosClient from "./axiosClient";
import { Memo } from "./types/memo";

type Response = Memo;

export const memoApi = {
  create: (): Promise<Response> => axiosClient.post("memo"),
};
