import type { TaskStatus } from "../interfaces/tasks";

export const statusOptions: TaskStatus[] = ["pending", "in_progress", "done"];

export const statusLabel: Record<TaskStatus, string> = {
  pending: "Pendiente",
  in_progress: "En progreso",
  done: "Finalizada",
};

export const statusStyles: Record<
  TaskStatus,
  {
    label: string;
    badgeColor: string;
    dotColor: string;
  }
> = {
  pending: {
    label: "Pendiente",
    badgeColor: "text-amber-600 bg-amber-50",
    dotColor: "bg-amber-500",
  },
  in_progress: {
    label: "En Marcha",
    badgeColor: "text-blue-600 bg-blue-50",
    dotColor: "bg-blue-500",
  },
  done: {
    label: "Completado",
    badgeColor: "text-emerald-600 bg-emerald-50",
    dotColor: "bg-emerald-500",
  },
};
