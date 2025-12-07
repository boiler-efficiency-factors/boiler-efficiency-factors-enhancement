import axios from "axios";
import { token } from "../auth/token";
import { refreshAccess } from "./auth";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const raw = axios.create({ baseURL });

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const access = token.getAccess();
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const newAccess = await refreshAccess();
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    }
    throw err;
  }
);
