export const ui = {
  text: {
    primary: "text-[#1B2559]",
    muted: "text-[#A3AED0]",
    label: "text-slate-800",
  },
  bg: {
    pageAuth: "bg-[#f8f9fd]",
    pageApp: "bg-[#F4F7FE]",
    modalOverlay: "bg-[#0B1133]/40",
    card: "bg-white",
    soft: "bg-[#F4F7FE]",
  },
  border: {
    subtle: "border-slate-100",
    input: "border-slate-200",
  },
  button: {
    primary:
      "rounded-xl bg-[#4318FF] px-8 py-3 text-sm font-bold text-white shadow-xl shadow-[#4318FF]/20 transition-all hover:bg-[#3311CC] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
    authPrimary:
      "rounded-xl bg-indigo-600 py-3.5 sm:py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",
    outline:
      "rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#1B2559] shadow-sm ring-1 ring-slate-100 transition-all hover:bg-slate-50 active:scale-95",
    ghost: "rounded-xl px-6 py-3 text-sm font-bold text-[#1B2559] transition-all hover:bg-slate-50",
    soft: "group flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-50/50 py-3.5 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white border border-transparent hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed",
  },
  input: {
    base: "rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#1B2559] placeholder:text-[#A3AED0] focus:border-[#4318FF] focus:outline-none focus:ring-4 focus:ring-[#4318FF]/10 transition",
    auth: "rounded-xl border border-slate-200 bg-white px-4 py-3 sm:py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
  },
  card: {
    summary:
      "flex flex-col gap-1 rounded-2xl bg-white p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.12)] border border-slate-50",
    kanban:
      "group relative flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100 cursor-pointer",
    modal: "relative flex w-full max-w-lg flex-col gap-6 rounded-4xl bg-white p-8 shadow-2xl",
  },
};
