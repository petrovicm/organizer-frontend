import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Expense = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as Expense[];
  },
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense: any) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id: number) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  },
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: [] as Expense[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        return state.filter((expense) => expense.id !== action.payload);
      });
  },
});

export default expensesSlice.reducer;
