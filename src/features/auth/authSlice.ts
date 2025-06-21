import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/login", credentials);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/signup", credentials);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) throw new Error("No token");
      const res = await api.get("/me");
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Could not fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // fetchMe
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;