import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import notesReducer from "../features/notes/notesSlice";
import eventsReducer from "../features/events/eventsSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import categoriesSlice from "../features/categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    events: eventsReducer,
    expenses: expensesReducer,
    categories: categoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
