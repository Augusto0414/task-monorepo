import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import tasksReducer from "../feature/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
