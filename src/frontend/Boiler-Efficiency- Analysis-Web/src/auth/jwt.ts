export type JwtPayload = Record<string, unknown> & {
  user_id?: string | number;
  exp?: number;
  iat?: number;
};

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  return atob(padded);
}

export function decodeJwtPayload(jwt: string): JwtPayload | null {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const json = base64UrlDecode(parts[1]);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getUserIdFromAccess(access: string | null | undefined): string | null {
  if (!access) return null;
  const payload = decodeJwtPayload<any>(access);
  const v = payload?.user_id ?? payload?.userId ?? null;
  return v == null ? null : String(v);
}
