import { api } from "./client";

export type PagingParams = { page?: number; size?: number };

export async function getWorkspacePaging(userId: string, params: PagingParams = {}) {
  const { page = 1, size = 10 } = params;
  return api.get(`/api/home/workspace/get/paging/${userId}`, { params: { page, size } });
}

export async function createWorkspace(body: any) {
  return api.post(`/api/home/workspace/create/`, body);
}

export async function deleteWorkspace(modelId: string) {
  return api.delete(`/api/home/workspace/delete/${modelId}`);
}

export async function getWorkspaceDetail(modelId: string) {
  return api.get(`/api/home/workspace/get/${modelId}`);
}

export async function getWorkspaceFeature(modelId: string) {
  return api.get(`/api/home/workspace/get/feature/${modelId}`);
}

export async function getWorkspaceMatrix(modelId: string) {
  return api.get(`/api/home/workspace/get/matrix/${modelId}`);
}
