import axios, { AxiosHeaders } from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_API_URL } = getEnv();
const apiClient = axios.create({
  baseURL: VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    const headers = AxiosHeaders.from(config.headers ?? {});
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});

export default apiClient;
