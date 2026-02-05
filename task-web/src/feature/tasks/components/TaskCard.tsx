import { statusStyles } from "../../../constants/tasks";
import { ui } from "../../../constants/ui";
import type { Task } from "../../../interfaces/tasks";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

function TaskCard({ task, onEdit }: TaskCardProps) {
  const currentStatus = statusStyles[task.status] || statusStyles.pending;

  return (
    <article onClick={() => onEdit(task)} className={ui.card.kanban}>
      <div className="flex flex-col gap-1.5">
        <h3 className={`text-sm font-bold ${ui.text.primary} uppercase tracking-wide`}>{task.title}</h3>
        <p className={`line-clamp-2 text-[13px] leading-relaxed ${ui.text.muted}`}>
          {task.description || "Sin descripción"}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
        <span
          className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight ${currentStatus.badgeColor}`}
        >
          {currentStatus.label}
        </span>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 border-2 border-white shadow-sm">
            JD
          </div>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
