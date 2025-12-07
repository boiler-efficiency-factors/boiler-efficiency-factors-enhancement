import { raw, api } from "./client";
import { token } from "../auth/token";

export async function login(user_name: string, password: string) {
  const { data } = await raw.post("/api/auth/login/", { user_name, password });
  token.set(data.access, data.refresh);
  return data;
}

export async function refreshAccess() {
  const refresh = token.getRefresh();
  if (!refresh) throw new Error("No refresh token");

  const { data } = await raw.post("/api/auth/refresh/", { refresh });
  token.set(data.access);
  return data.access as string;
}

export async function logout() {
  const refresh = token.getRefresh();
  if (refresh) await api.post("/api/auth/logout/", { refresh });
  token.clear();
}
