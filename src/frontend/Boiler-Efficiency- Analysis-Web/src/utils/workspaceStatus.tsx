// src/utils/workspaceStatus.tsx
export type UiStatus = "completed" | "training" | "pending";

export function normalizeStatus(raw: unknown): UiStatus {
  const s = String(raw ?? "").toLowerCase();
  if (["completed", "complete", "done", "success", "succeeded", "finished"].includes(s)) return "completed";
  if (["training", "running", "in_progress", "in-progress", "progress"].includes(s)) return "training";
  if (["pending", "queued", "wait", "waiting", ""].includes(s)) return "pending";
  return "pending";
}

export function getWorkspaceId(w: any): string | null {
  const v = w?.id ?? w?.workspace_id ?? w?.model_id ?? w?.session_id;
  if (v === undefined || v === null) return null;

  const s = String(v).trim();
  if (!s) return null; 

  return s;
}


export function isCompletedWorkspace(w: any): boolean {
  return normalizeStatus(w?.status) === "completed";
}

export function getWorkspaceCreatedAtMs(w: any): number {
  const v = w?.createdAt ?? w?.created_at ?? w?.updatedAt ?? w?.updated_at ?? "";
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : 0;
}

export function isTerminalStatus(raw: unknown): boolean {
  const s = String(raw ?? "").toLowerCase();
  return [
    "completed", "complete", "done", "success", "succeeded", "finished",
    "failed", "error", "errored",
    "cancelled", "canceled", "revoked",
  ].includes(s);
}
