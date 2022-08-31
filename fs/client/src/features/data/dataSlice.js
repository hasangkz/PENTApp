import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataServices from './dataServices';
const initialState = {
  notes: [],
  isError: false,
  isLoading: false,
  isDone: false,
  message: '',
};

export const dataSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDone = true;
        state.notes.unshift(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDone = true;
        state.notes = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDone = true;
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDone = true;
        state.notes = state.notes.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const createNote = createAsyncThunk(
  'note/create',
  async (noteData, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await dataServices.createNote(noteData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getNote = createAsyncThunk('note/get', async (_, ThunkAPI) => {
  try {
    const token = ThunkAPI.getState().auth.user.token;
    return await dataServices.getNote(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message;
    return ThunkAPI.rejectWithValue(message);
  }
});

export const getAllNotes = createAsyncThunk(
  'note/getAll',
  async (_, ThunkAPI) => {
    try {
      return await dataServices.getAllNotes();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await dataServices.deleteNote(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export default dataSlice.reducer;

export const { reset } = dataSlice.actions;
