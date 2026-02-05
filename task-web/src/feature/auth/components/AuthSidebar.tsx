import { Asterisk } from "lucide-react";

function AuthSidebar() {
  return (
    <div className="relative hidden w-[35%] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-10 lg:flex">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-pink-300 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
        <Asterisk className="h-6 w-6" strokeWidth={3} />
      </div>

      <div className="relative z-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/70">Organiza tu día</p>
        <h1 className="text-3xl font-bold leading-tight text-white">
          Accede a tu centro personal de claridad y productividad
        </h1>
      </div>
    </div>
  );
}

export default AuthSidebar;
