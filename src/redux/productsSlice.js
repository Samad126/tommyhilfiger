import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`https://ecommerse.apasni.me${data}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    cartCount: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
    updateCartCount: (state) => {
      const itemCount = (
        JSON.parse(localStorage.getItem("cartItems")) || []
      ).reduce((acc, item) => acc + item.count, 0);

      state.cartCount = itemCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProducts, updateCartCount } = productSlice.actions;
export default productSlice.reducer;
