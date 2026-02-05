import { Plus } from "lucide-react";
import { statusStyles } from "../../../constants/tasks";
import { ui } from "../../../constants/ui";
import type { Task, TaskStatus } from "../../../interfaces/tasks";
import TaskCard from "./TaskCard";
import { TaskCardSkeleton } from "./TaskCardSkeleton";

interface KanbanColumnProps {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  isBusy: boolean;
  isLoading?: boolean;
  onEdit: (task: Task) => void;
  onAddTask: () => void;
}

function KanbanColumn({ status, label, tasks, isBusy, isLoading, onEdit, onAddTask }: KanbanColumnProps) {
  const dotColor = statusStyles[status]?.dotColor ?? statusStyles.pending.dotColor;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
          <h2 className={`text-sm font-bold uppercase tracking-wider ${ui.text.primary}`}>{label}</h2>
          <span className={`ml-1 text-sm font-bold ${ui.text.muted}`}>({isLoading ? "..." : tasks.length})</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 min-h-37.5">
        {isLoading ? (
          <>
            <TaskCardSkeleton />
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} />)
        )}
        {!isLoading && tasks.length === 0 && !isBusy && (
          <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
            <p className="text-xs font-medium text-slate-400 italic">No hay tareas pendientes</p>
          </div>
        )}
      </div>

      <button onClick={onAddTask} disabled={isLoading} className={ui.button.soft}>
        <Plus size={18} />
        Añadir tarea
      </button>
    </div>
  );
}

export default KanbanColumn;
