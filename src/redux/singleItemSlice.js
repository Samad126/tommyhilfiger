import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleItem = createAsyncThunk(
  "singleItem/fetchSingleItem",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://ecommerse.apasni.me/products/get/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the item");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const singleItemSlice = createSlice({
  name: "singleItem",
  initialState: {
    item: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSingleItem: (state) => {
      state.item = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchSingleItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSingleItem } = singleItemSlice.actions;
export default singleItemSlice.reducer;
