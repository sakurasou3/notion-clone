import axiosClient from "./axiosClient";
import { Memo } from "./types/memo";

type UpdateParam = Memo;

type Response = Memo;
type GetAllResponse = Memo[];

export const memoApi = {
  create: (): Promise<Response> => axiosClient.post("memo"),
  getAll: (): Promise<GetAllResponse> => axiosClient.get("memo"),
  getOne: (id: string): Promise<Response> => axiosClient.get(`memo/${id}`),
  update: (id: string, params: UpdateParam): Promise<Response> =>
    axiosClient.put(`memo/${id}`, params),
};
