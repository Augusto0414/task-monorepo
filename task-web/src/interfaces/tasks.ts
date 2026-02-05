import type { Dispatch, FormEvent, SetStateAction } from "react";

export type TaskStatus = "pending" | "in_progress" | "done";

export interface Task {
  id: string | number;
  title: string;
  description?: string | null;
  status: TaskStatus;
}

export interface TasksState {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface TaskNotification {
  id: string;
  title: string;
  message: string;
  tone: "info" | "success" | "warning";
  createdAt: string;
}

export interface TaskFormState {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskFormProps {
  editingTask: Task | null;
  setEditingTask: Dispatch<SetStateAction<Task | null>>;
  taskForm: TaskFormState;
  setTaskForm: Dispatch<SetStateAction<TaskFormState>>;
  taskFormError: string | null;
  tasksError: string | null;
  statusOptions: TaskStatus[];
  statusLabel: Record<TaskStatus, string>;
  isBusy: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export interface TasksSectionProps {
  userName: string;
  isBusy: boolean;
  statusOptions: TaskStatus[];
  statusLabel: Record<TaskStatus, string>;
  editingTask: Task | null;
  setEditingTask: Dispatch<SetStateAction<Task | null>>;
  taskForm: TaskFormState;
  setTaskForm: Dispatch<SetStateAction<TaskFormState>>;
  taskFormError: string | null;
  tasksError: string | null;
  tasksStatus: "idle" | "loading" | "succeeded" | "failed";
  totalTasks: number;
  tasksByStatus: Record<TaskStatus, Task[]>;
  filterText: string;
  setFilterText: Dispatch<SetStateAction<string>>;
  isCreateValid: boolean;
  isEditValid: boolean;
  notifications: TaskNotification[];
  onDismissNotification: (notificationId: string) => void;
  onCreateTask: (event: FormEvent<HTMLFormElement>) => Promise<boolean>;
  onUpdateTask: (event: FormEvent<HTMLFormElement>) => Promise<boolean>;
  onLogout: () => void;
}
