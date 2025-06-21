import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface Note {
  id: number;
  title: string;
  description?: string;
  date?: string | null;
  completed: boolean;
}

interface NotesState {
  items: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await api.get("/notes");
  return res.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch tasks';
      });
  },
});

export default notesSlice.reducer;