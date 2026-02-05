import { BarChart2, CheckCircle2, Clock, X, Zap } from "lucide-react";
import { useState } from "react";
import { ui } from "../../../constants/ui";
import type { Task, TaskStatus, TasksSectionProps } from "../../../interfaces/tasks";
import KanbanColumn from "./KanbanColumn";
import SummaryCard from "./SummaryCard";
import { SummaryCardSkeleton } from "./SummaryCardSkeleton";
import TaskForm from "./TaskForm";

function TasksSection({
  userName,
  isBusy,
  statusOptions,
  statusLabel,
  editingTask,
  setEditingTask,
  taskForm,
  setTaskForm,
  taskFormError,
  tasksError,
  tasksStatus,
  totalTasks,
  tasksByStatus,
  filterText,
  setFilterText,
  isCreateValid,
  isEditValid,
  notifications,
  onDismissNotification,
  onCreateTask,
  onUpdateTask,
  onLogout,
}: TasksSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toneStyles = {
    info: "border-sky-100 bg-sky-50 text-sky-900",
    success: "border-emerald-100 bg-emerald-50 text-emerald-900",
    warning: "border-amber-100 bg-amber-50 text-amber-900",
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setTaskForm((prev) => ({ ...prev, status }));
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setIsFormOpen(false);
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className={`text-3xl font-bold ${ui.text.primary}`}>Tablero de Tareas</h1>
          <p className={`text-sm font-medium ${ui.text.muted}`}>Gestiona tus proyectos y tareas pendientes</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
          <div className="w-full sm:w-72">
            <input
              className={`w-full ${ui.input.base}`}
              placeholder="Filtrar por título o descripción"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <p className="hidden text-sm font-bold text-[#1B2559] sm:block">{userName}</p>
          <button className={ui.button.outline} type="button" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tasksStatus === "loading" ? (
          <>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </>
        ) : (
          <>
            <SummaryCard label="Total" count={totalTasks} icon={<BarChart2 className="text-[#4318FF]" size={24} />} />
            <SummaryCard
              label="Pendientes"
              count={tasksByStatus.pending.length}
              icon={<Clock className="text-[#FFB800]" size={24} />}
            />
            <SummaryCard
              label="En Progreso"
              count={tasksByStatus.in_progress.length}
              icon={<Zap className="text-[#3965FF]" size={24} />}
            />
            <SummaryCard
              label="Completadas"
              count={tasksByStatus.done.length}
              icon={<CheckCircle2 className="text-[#05CD99]" size={24} />}
            />
          </>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 ${toneStyles[notification.tone]}`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold">{notification.title}</p>
                <p className="text-xs leading-relaxed opacity-80">{notification.message}</p>
                <span className="text-[11px] uppercase tracking-wide opacity-60">
                  {new Date(notification.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <button
                type="button"
                className="rounded-full p-1 transition hover:bg-white/40"
                onClick={() => onDismissNotification(notification.id)}
                aria-label="Cerrar notificacion"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {statusOptions.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              label={statusLabel[status]}
              tasks={tasksByStatus[status]}
              isBusy={isBusy}
              isLoading={tasksStatus === "loading"}
              onEdit={handleEdit}
              onAddTask={() => handleAddTask(status)}
            />
          ))}
        </div>

        {isFormOpen && (
          <TaskForm
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            taskFormError={taskFormError}
            tasksError={tasksError}
            statusOptions={statusOptions}
            statusLabel={statusLabel}
            isBusy={isBusy}
            onSubmit={async (e) => {
              const isEdit = !!editingTask;
              const isValid = isEdit ? isEditValid : isCreateValid;
              if (isEdit) {
                void onUpdateTask(e);
              } else {
                void onCreateTask(e);
              }
              if (isValid) {
                handleCloseForm();
              }
            }}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </section>
  );
}

export default TasksSection;
