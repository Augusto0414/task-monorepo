import type { AxiosError } from "axios";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const isAxiosError = (error: unknown): error is AxiosError<ApiErrorResponse> => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.response?.data?.error || error.message || fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
};
