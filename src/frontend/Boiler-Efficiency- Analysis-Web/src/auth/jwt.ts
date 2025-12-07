export function getUserIdFromAccess(access: string | null): string | null {
  if (!access) return null;
  try {
    const payload = access.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return String(json.user_id ?? json.userId ?? json.sub ?? "");
  } catch {
    return null;
  }
}
