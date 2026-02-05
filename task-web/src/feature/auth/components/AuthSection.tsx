import { AnimatePresence, motion } from "framer-motion";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ui } from "../../../constants/ui";
import type { AuthSectionProps } from "../../../interfaces/auth";
import AuthSidebar from "./AuthSidebar";

function AuthSection({
  authMode,
  onModeChange,
  authForm,
  setAuthForm,
  authFormError,
  authError,
  registerNotice,
  authStatus,
  onSubmit,
}: AuthSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-5xl overflow-hidden rounded-4xl sm:rounded-[2.5rem] bg-white p-2 sm:p-3 shadow-2xl"
      >
        <AuthSidebar />

        <div className="flex flex-1 flex-col px-6 py-12 sm:px-10 sm:py-16 lg:px-20 xl:py-20 min-h-150 sm:min-h-175">
          <div className="mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
              <Asterisk className="h-6 w-6" strokeWidth={3} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-10 text-center sm:text-left">
                <h2 className="mb-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {authMode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-slate-500 mx-auto sm:mx-0">
                  Accede a tus tareas, notas y proyectos desde cualquier lugar y mantén todo fluyendo en un solo sitio.
                </p>
              </div>

              <form className="flex w-full max-w-md flex-col gap-5 sm:gap-6 mx-auto sm:mx-0" onSubmit={onSubmit}>
                {authMode === "register" && (
                  <label className="flex flex-col gap-2">
                    <span className="px-1 text-xs font-bold uppercase tracking-wider text-slate-800">
                      Nombre completo
                    </span>
                    <input
                      className={`w-full ${ui.input.auth}`}
                      placeholder="Ej. Juan Pérez"
                      value={authForm.name}
                      onChange={(event) =>
                        setAuthForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                  </label>
                )}

                <label className="flex flex-col gap-2">
                  <span className="px-1 text-xs font-bold uppercase tracking-wider text-slate-800">
                    Correo electrónico
                  </span>
                  <input
                    type="email"
                    className={`w-full ${ui.input.auth}`}
                    placeholder="ejemplo@correo.com"
                    value={authForm.email}
                    onChange={(event) =>
                      setAuthForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="px-1 text-xs font-bold uppercase tracking-wider text-slate-800">Contraseña</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`w-full ${ui.input.auth}`}
                      placeholder="••••••••"
                      value={authForm.password}
                      onChange={(event) =>
                        setAuthForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {authMode === "register" && (
                  <label className="flex flex-col gap-2">
                    <span className="px-1 text-xs font-bold uppercase tracking-wider text-slate-800">
                      Confirmar contraseña
                    </span>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full ${ui.input.auth}`}
                        placeholder="••••••••"
                        value={authForm.passwordConfirmation}
                        onChange={(event) =>
                          setAuthForm((prev) => ({
                            ...prev,
                            passwordConfirmation: event.target.value,
                          }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>
                )}

                {(authFormError || authError) && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-500"
                  >
                    {authFormError || authError}
                  </motion.p>
                )}

                {registerNotice && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-500"
                  >
                    {registerNotice}
                  </motion.p>
                )}

                <button
                  className={`mt-2 sm:mt-4 ${ui.button.authPrimary}`}
                  type="submit"
                  disabled={authStatus === "loading"}
                >
                  {authStatus === "loading"
                    ? "Procesando..."
                    : authMode === "register"
                      ? "Empezar ahora"
                      : "Iniciar sesión"}
                </button>
              </form>

              <div className="mt-8 sm:mt-12 text-center sm:text-left text-sm">
                <span className="text-slate-500">
                  {authMode === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
                </span>{" "}
                <button
                  className="font-bold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline"
                  onClick={() => onModeChange(authMode === "login" ? "register" : "login")}
                >
                  {authMode === "login" ? "Regístrate" : "Inicia sesión"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthSection;
