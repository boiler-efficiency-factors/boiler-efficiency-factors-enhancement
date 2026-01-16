import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { token } from "../auth/token";
import { refreshAccess } from "./auth";

const prodBaseURL = String(import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
const baseURL = import.meta.env.DEV ? "" : prodBaseURL;
export const raw = axios.create({ baseURL });
export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const access = token.getAccess();
  if (access) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${access}`;
  }
  return config;
});

type RetryConfig = AxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetryConfig | undefined;

    const url = String(original?.url ?? "");
    const isAuthRoute =
      url.includes("/api/auth/login/") ||
      url.includes("/api/auth/refresh/") ||
      url.includes("/api/auth/logout/");

    if (status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;
      const newAccess = await refreshAccess(); 
      original.headers = original.headers ?? {};
      (original.headers as any).Authorization = `Bearer ${newAccess}`;
      return api(original);
    }

    return Promise.reject(error);

  }
);
