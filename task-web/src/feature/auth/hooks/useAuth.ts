import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetTasks } from "../../tasks/tasksSlice";
import { clearAuthError, loginUser, logout, logoutUser, registerUser } from "../authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { token, user, status, error } = useAppSelector((state) => state.auth);

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [registerNotice, setRegisterNotice] = useState<string | null>(null);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [authFormError, setAuthFormError] = useState<string | null>(null);

  const handleAuthModeChange = (mode: "login" | "register") => {
    setAuthMode(mode);
    if (mode === "login") {
      setRegisterNotice(null);
      setAuthForm((prev) => ({ ...prev, passwordConfirmation: "" }));
    }
  };

  const validateAuthForm = () => {
    if (!authForm.email.trim() || !authForm.password.trim()) {
      return "El correo y la contraseña son obligatorios.";
    }
    if (authMode === "register" && !authForm.name.trim()) {
      return "El nombre es obligatorio para el registro.";
    }
    if (authMode === "register" && authForm.password !== authForm.passwordConfirmation) {
      return "La confirmación de contraseña no coincide.";
    }
    return null;
  };

  const handleAuthSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAuthFormError(null);
    dispatch(clearAuthError());
    const validationError = validateAuthForm();
    if (validationError) {
      setAuthFormError(validationError);
      return;
    }

    if (authMode === "register") {
      const result = await dispatch(
        registerUser({
          name: authForm.name.trim(),
          email: authForm.email.trim(),
          password: authForm.password,
          password_confirmation: authForm.passwordConfirmation,
        }),
      );
      if (registerUser.fulfilled.match(result)) {
        setRegisterNotice("¡Registro completado con éxito! Por favor, inicia sesión.");
        setAuthMode("login");
        setAuthForm((prev) => ({ ...prev, password: "", passwordConfirmation: "" }));
      }
      return;
    }

    await dispatch(
      loginUser({
        email: authForm.email.trim(),
        password: authForm.password,
      }),
    );
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await dispatch(logoutUser()).unwrap();
      } catch {
        // Allow local logout even if the backend rejects the token.
      }
    }
    dispatch(logout());
    dispatch(resetTasks());
  };

  return {
    token,
    user,
    status,
    error,
    authMode,
    registerNotice,
    authForm,
    authFormError,
    setAuthForm,
    handleAuthModeChange,
    handleAuthSubmit,
    handleLogout,
  };
}
