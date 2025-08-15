import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Category = {
  id?: number;
  name: string;
  icon?: string;
  color?: string;
  defaultNws?: string;
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as Category[];
  },
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: Partial<Category>) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/categories`, category, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as Category;
  },
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Partial<Category>) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/categories/${category.id}`,
      category,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data as Category;
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [] as Category[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (_, action) => action.payload)
      .addCase(addCategory.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.findIndex((cat) => cat.id === action.payload.id);
        if (idx !== -1) state[idx] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        return state.filter((cat) => cat.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
