export type WorkspaceStatus = "completed" | "training" | "pending";

export type ModelName =
  | "lightgbm"
  | "xgboost"
  | "random_forest"
  | "gradient_boosting"
  | string;

export interface Workspace {
  id: string;
  name: string;
  model: ModelName;
  startDate: string;
  endDate: string;
  createdAt?: string;
  modifiedAt?: string;
  status: WorkspaceStatus;
  parameter?: Record<string, unknown>;
  tuning?: string;
  dependentVar?: string;
  excludedVar?: string[];
  model_id?: string;
  modelId?: string;
  hyperparameters?: string[];
  dependentVariable?: string;
  excludedVariables?: string[];
  [key: string]: any;
}

export interface WorkspaceCreateInput {
  name: string;
  model: ModelName;
  startDate: string;
  endDate: string;
  parameter?: Record<string, unknown>;
  tuning?: string;
  dependentVar?: string;
  excludedVar?: string[];
}

export interface WorkspacePage {
  items: Workspace[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

function toStatus(raw: any): WorkspaceStatus {
  const s = String(raw ?? "pending").toLowerCase();
  if (s === "completed" || s === "training" || s === "pending") return s;
  if (s === "running" || s === "started" || s === "processing") return "training";
  if (s === "success" || s === "done" || s === "finished") return "completed";
  return "pending";
}

export function mapWorkspace(raw: any): Workspace {
  const id = String(raw?.model_id ?? raw?.modelId ?? raw?.id ?? raw?.pk ?? "");
  const name = String(
    raw?.workspace ??
      raw?.name ??
      raw?.workspace_name ??
      raw?.workspaceName ??
      ""
  );
  const model = String(raw?.model_name ?? raw?.model ?? raw?.selected_model ?? "");
  const startDate = String(raw?.start_date ?? raw?.startDate ?? "");
  const endDate = String(raw?.end_date ?? raw?.endDate ?? "");
  const createdAt = raw?.created_at ?? raw?.createdAt;
  const modifiedAt = raw?.modified_at ?? raw?.modifiedAt;

  const status = toStatus(
    raw?.session_status ??
      raw?.status ??
      raw?.training_status ??
      raw?.state ??
      raw?.sessionState
  );

  return {
    id,
    name,
    model,
    startDate,
    endDate,
    createdAt,
    modifiedAt,
    status,
    parameter: raw?.parameter ?? raw?.parameters ?? raw?.hyperparameters ?? {},
    tuning: raw?.tuning ?? "",
    dependentVar:
      raw?.dependent_var ??
      raw?.dependent_variable ??
      raw?.dependentVariable ??
      "",
    excludedVar:
      raw?.excluded_var ??
      raw?.excluded_variables ??
      raw?.excludedVariables ??
      [],
  };
}

export function normalizeWorkspacePage(data: any, page: number, size: number): WorkspacePage {
  if (data && Array.isArray(data.results)) {
    const items = data.results.map(mapWorkspace);
    const total = Number(data.count ?? items.length);
    return { items, page, size, total, totalPages: Math.max(1, Math.ceil(total / size)) };
  }

  if (Array.isArray(data)) {
    const items = data.map(mapWorkspace);
    const total = items.length;
    return { items, page, size, total, totalPages: Math.max(1, Math.ceil(total / size)) };
  }

  return { items: [], page, size, total: 0, totalPages: 1 };
}
