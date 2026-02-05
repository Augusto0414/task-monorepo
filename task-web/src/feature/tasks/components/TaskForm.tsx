import { ChevronDown, X } from "lucide-react";
import { ui } from "../../../constants/ui";
import type { TaskFormProps, TaskStatus } from "../../../interfaces/tasks";

function TaskForm({
  editingTask,
  setEditingTask,
  taskForm,
  setTaskForm,
  taskFormError,
  tasksError,
  statusOptions,
  statusLabel,
  isBusy,
  onSubmit,
  onClose,
}: TaskFormProps) {
  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center ${ui.bg.modalOverlay} p-4 backdrop-blur-[2px]`}
    >
      <form className={ui.card.modal} onSubmit={onSubmit}>
        <button
          type="button"
          className="absolute right-6 top-6 text-[#A3AED0] transition-colors hover:text-rose-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-1">
          <h2 className={`text-xl font-bold ${ui.text.primary}`}>{editingTask ? "Editar Tarea" : "Nueva Tarea"}</h2>
          <p className={`text-sm ${ui.text.muted}`}>
            {editingTask
              ? "Modifica los campos para actualizar la tarea"
              : "Completa los campos para crear una nueva tarea"}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-[#1B2559]">
              Título <span className="text-rose-500 font-normal">*</span>
            </span>
            <input
              className={ui.input.base}
              placeholder="Escribe el título de la tarea"
              value={editingTask ? editingTask.title : taskForm.title}
              onChange={(event) => {
                const value = event.target.value;
                if (editingTask) {
                  setEditingTask({ ...editingTask, title: value });
                } else {
                  setTaskForm((prev) => ({ ...prev, title: value }));
                }
              }}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-[#1B2559]">Descripción</span>
            <textarea
              rows={4}
              className={`resize-none ${ui.input.base}`}
              placeholder="Describe la tarea (opcional)"
              value={editingTask ? (editingTask.description ?? "") : taskForm.description}
              onChange={(event) => {
                const value = event.target.value;
                if (editingTask) {
                  setEditingTask({
                    ...editingTask,
                    description: value,
                  });
                } else {
                  setTaskForm((prev) => ({ ...prev, description: value }));
                }
              }}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-[#1B2559]">Estado</span>
            <div className="relative">
              <select
                className={`w-full appearance-none ${ui.input.base}`}
                value={editingTask ? editingTask.status : taskForm.status}
                onChange={(event) => {
                  const value = event.target.value as TaskStatus;
                  if (!statusOptions.includes(value)) {
                    return;
                  }
                  if (editingTask) {
                    setEditingTask({ ...editingTask, status: value });
                  } else {
                    setTaskForm((prev) => ({ ...prev, status: value }));
                  }
                }}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel[status]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#A3AED0]">
                <ChevronDown size={20} />
              </div>
            </div>
          </label>
        </div>

        {(taskFormError || tasksError) && (
          <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100">
            <p className="text-xs font-bold text-rose-500">{taskFormError || tasksError}</p>
          </div>
        )}

        <div className="mt-2 flex items-center justify-end gap-3">
          <button type="button" className={ui.button.ghost} onClick={onClose}>
            Cancelar
          </button>
          <button className={ui.button.primary} type="submit" disabled={isBusy}>
            {editingTask ? "Guardar Cambios" : "Crear Tarea"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
