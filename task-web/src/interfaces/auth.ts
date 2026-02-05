import type { Dispatch, FormEvent, SetStateAction } from "react";

export interface AuthState {
  token: string | null;
  user: {
    id: number | string;
    name: string;
    email: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthFormState {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthSectionProps {
  authMode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  authForm: AuthFormState;
  setAuthForm: Dispatch<SetStateAction<AuthFormState>>;
  authFormError: string | null;
  authError: string | null;
  registerNotice: string | null;
  authStatus: "idle" | "loading" | "succeeded" | "failed";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
