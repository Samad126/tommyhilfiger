import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./mainLoaderSlice";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        "https://ecommerse.apasni.me/categories/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    cats: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCategories: (state) => {
      state.cats = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cats = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
