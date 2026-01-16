// src/api/workspace.ts
import { api } from "./client";
import type { Workspace, WorkspaceCreateInput, WorkspacePage } from "../types/workspace";
import { mapWorkspace, normalizeWorkspacePage } from "../types/workspace";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type PagingEnvelope = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: any[];
};

export type WorkspacePagingResult = {
  page: WorkspacePage;
  next: string | null;
  previous: string | null;
  count: number;
};

function parsePageFromUrl(url: string | null | undefined): number | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const p = u.searchParams.get("page");
    if (!p) return null;
    const n = Number.parseInt(p, 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export async function listWorkspaces(userId: string, page = 1, size = 10): Promise<WorkspacePage> {
  const { data } = await api.get(`/api/home/workspace/get/paging/${encodeURIComponent(userId)}`, {
    params: { page, size },
  });
  return normalizeWorkspacePage(data, page, size);
}

export async function getWorkspacePaging(page: number) {
  const { data } = await api.get<Paginated<any>>("/api/home/workspace/get/paging/", {
    params: { page },
  });
  return data;
}

export async function getWorkspaceSession(modelId: string) {
  const { data } = await api.get(`/api/home/workspace/get/session/${modelId}/`);
  return data;
}

export async function listWorkspacesPaging(userId: string, page = 1, size = 10): Promise<WorkspacePagingResult> {
  const { data } = await api.get(`/api/home/workspace/get/paging/${encodeURIComponent(userId)}`, {
    params: { page, size },
  });

  const envelope = data as PagingEnvelope;
  const normalized = normalizeWorkspacePage(data, page, size);

  return {
    page: normalized,
    next: envelope?.next ?? null,
    previous: envelope?.previous ?? null,
    count: Number(envelope?.count ?? normalized.total ?? normalized.items.length ?? 0),
  };
}

export async function listWorkspacesByPageUrl(pageUrl: string, size = 10): Promise<WorkspacePagingResult> {
  const url =
    pageUrl.startsWith("http://") || pageUrl.startsWith("https://")
      ? new URL(pageUrl).pathname + new URL(pageUrl).search
      : pageUrl;

  const { data } = await api.get(url);

  const envelope = data as PagingEnvelope;

  const inferredPage =
    parsePageFromUrl(pageUrl) ??
    parsePageFromUrl(envelope?.next) ??
    parsePageFromUrl(envelope?.previous) ??
    1;

  const normalized = normalizeWorkspacePage(data, inferredPage, size);

  return {
    page: normalized,
    next: envelope?.next ?? null,
    previous: envelope?.previous ?? null,
    count: Number(envelope?.count ?? normalized.total ?? normalized.items.length ?? 0),
  };
}

export async function createWorkspace(input: WorkspaceCreateInput): Promise<Workspace> {
  if (!input.dependentVar || input.dependentVar.trim() === "") {
    throw new Error("dependentVar is required");
  }

  const body: any = {
    workspace: input.name,
    model_name: input.model,
    start_date: input.startDate,
    end_date: input.endDate,
    parameter: input.parameter ?? {},
    dependent_var: input.dependentVar,
    excluded_var: input.excludedVar ?? [],
  };

  if (typeof input.tuning === "string" && input.tuning.trim() !== "") {
    body.tuning = input.tuning;
  }

  const { data } = await api.post("/api/home/workspace/create/", body, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(d) => JSON.stringify(d)],
  });

  const raw = (data as any)?.workspace ?? (data as any)?.data ?? data;
  return mapWorkspace(raw);
}

export async function deleteWorkspace(modelId: string) {
  await api.delete(`/api/home/workspace/delete/${encodeURIComponent(modelId)}/`);
}

export async function getWorkspaceDetail(modelId: string): Promise<any> {
  const { data } = await api.get(`/api/home/workspace/get/${encodeURIComponent(modelId)}/`);
  return data;
}

export async function getWorkspaceMain(modelId: string): Promise<any> {
  return getWorkspaceDetail(modelId);
}

export async function getWorkspaceFeature(modelId: string): Promise<any> {
  return getWorkspaceSession(modelId);
}


