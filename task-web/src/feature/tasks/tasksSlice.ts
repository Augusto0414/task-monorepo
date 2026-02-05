import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../api/axios";
import { getApiErrorMessage } from "../../api/errors";
import type { Task, TaskStatus, TasksState } from "../../interfaces/tasks";

const initialState: TasksState = {
  items: [],
  status: "idle",
  error: null,
};

const isSameId = (left: Task["id"], right: Task["id"]) => String(left) === String(right);

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tasks");
      return response.data.data as Task[];
    } catch (error: unknown) {
      return rejectWithValue(getApiErrorMessage(error, "Error al cargar tareas"));
    }
  },
);

export const createTask = createAsyncThunk<Task, Omit<Task, "id">, { rejectValue: string }>(
  "tasks/create",
  async (payload: Omit<Task, "id">, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tasks", payload);
      return response.data.task as Task;
    } catch (error: unknown) {
      return rejectWithValue(getApiErrorMessage(error, "Error al crear tarea"));
    }
  },
);

export const updateTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  "tasks/update",
  async (payload: Task, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/tasks/${payload.id}`, payload);
      return response.data.task as Task;
    } catch (error: unknown) {
      return rejectWithValue(getApiErrorMessage(error, "Error al actualizar tarea"));
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasksError(state) {
      state.error = null;
    },
    resetTasks(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
    upsertTask(state, action: PayloadAction<Task>) {
      const incoming = action.payload;
      const existing = state.items.find((item) => isSameId(item.id, incoming.id));
      if (existing) {
        Object.assign(existing, incoming);
        return;
      }
      state.items = [incoming, ...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload ?? [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Error al cargar tareas");
      })
      .addCase(createTask.pending, (state, action) => {
        state.error = null;
        const tempId = `temp-${action.meta.requestId}`;
        const tempTask: Task = {
          id: tempId,
          title: action.meta.arg.title,
          description: action.meta.arg.description,
          status: action.meta.arg.status,
        };
        state.items = [tempTask, ...state.items];
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const tempId = `temp-${action.meta.requestId}`;
        state.items = state.items.filter(
          (item) => !isSameId(item.id, tempId) && !isSameId(item.id, action.payload.id),
        );
        state.items = [action.payload, ...state.items];
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = String(action.payload ?? "Error al crear tarea");
        const tempId = `temp-${action.meta.requestId}`;
        state.items = state.items.filter((item) => !isSameId(item.id, tempId));
      })
      .addCase(updateTask.pending, (state, action) => {
        state.error = null;
        state.items = state.items.map((item) =>
          isSameId(item.id, action.meta.arg.id) ? { ...item, ...action.meta.arg } : item,
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (isSameId(item.id, action.payload.id) ? action.payload : item));
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = String(action.payload ?? "Error al actualizar tarea");
      });
  },
});

export const { clearTasksError, resetTasks, upsertTask } = tasksSlice.actions;

export default tasksSlice.reducer;
export type { Task, TaskStatus, TasksState };
