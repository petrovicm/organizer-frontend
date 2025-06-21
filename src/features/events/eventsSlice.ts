import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface Event {
  id: number;
  title: string;
  description?: string;
  date?: string | null;
  completed: boolean;
}

interface EventsState {
  items: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await api.get("/events");
  return res.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch tasks';
      });
  },
});

export default eventsSlice.reducer;