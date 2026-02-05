import { statusLabel, statusOptions } from "../../constants/tasks";
import { ui } from "../../constants/ui";
import AuthSection from "../auth/components/AuthSection";
import { useAuth } from "../auth/hooks/useAuth";
import TasksSection from "../tasks/components/TasksSection";
import { useTasks } from "../tasks/hooks/useTasks";

function HomeView() {
  const {
    token,
    user,
    status: authStatus,
    error: authError,
    authMode,
    registerNotice,
    authForm,
    authFormError,
    setAuthForm,
    handleAuthModeChange,
    handleAuthSubmit,
    handleLogout,
  } = useAuth();

  const {
    status: tasksStatus,
    error: tasksError,
    taskForm,
    taskFormError,
    editingTask,
    filterText,
    tasksByStatus,
    isSubmitting,
    isCreateValid,
    isEditValid,
    notifications,
    onDismissNotification,
    setFilterText,
    setTaskForm,
    setEditingTask,
    handleCreateTask,
    handleUpdateTask,
  } = useTasks(token, user?.id ?? null);

  const isBusy = authStatus === "loading" || tasksStatus === "loading" || isSubmitting;
  const totalTasks = tasksByStatus.pending.length + tasksByStatus.in_progress.length + tasksByStatus.done.length;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${!token ? ui.bg.pageAuth : `${ui.bg.pageApp} ${ui.text.primary}`}`}
    >
      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-6 py-10 lg:px-12">
        {!token ? (
          <AuthSection
            authMode={authMode}
            onModeChange={handleAuthModeChange}
            authForm={authForm}
            setAuthForm={setAuthForm}
            authFormError={authFormError}
            authError={authError}
            registerNotice={registerNotice}
            authStatus={authStatus}
            onSubmit={handleAuthSubmit}
          />
        ) : (
          <TasksSection
            userName={user?.name || "N/A"}
            isBusy={isBusy}
            statusOptions={statusOptions}
            statusLabel={statusLabel}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            taskFormError={taskFormError}
            tasksError={tasksError}
            tasksStatus={tasksStatus}
            totalTasks={totalTasks}
            tasksByStatus={tasksByStatus}
            filterText={filterText}
            setFilterText={setFilterText}
            isCreateValid={isCreateValid}
            isEditValid={isEditValid}
            notifications={notifications}
            onDismissNotification={onDismissNotification}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

export default HomeView;
