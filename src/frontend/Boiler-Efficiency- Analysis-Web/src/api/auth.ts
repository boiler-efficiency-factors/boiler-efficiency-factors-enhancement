import { raw } from "./client";
import { token } from "../auth/token";
import { session } from "../auth/session";
import { decodeJwtPayload } from "../auth/jwt";

export async function login(user: string, password: string) {
  const { data } = await raw.post("/api/auth/login/", { user_name: user, password });
  token.set(data.access, data.refresh);
  session.setUserName(user);
  const payload = decodeJwtPayload(data.access);
  if (payload?.user_id != null) session.setUserId(String(payload.user_id));
  return data;
}

export async function register(user: string, password: string) {
  const { data } = await raw.post("/api/user/register/", { user_name: user, password, verify_password: password, });
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
  try {
    await raw.post("/api/auth/logout/", refresh ? { refresh } : {});
  } finally {
    token.clear();
    session.clear();
  }
}
