import axiosClient from "./axiosClient";
import { Memo } from "./types/memo";

type Response = Memo;
type GetAllResponse = Memo[];

export const memoApi = {
  create: (): Promise<Response> => axiosClient.post("memo"),
  getAll: (): Promise<GetAllResponse> => axiosClient.get("memo"),
};
