import { createSlice } from '@reduxjs/toolkit';

const mainLoaderSlice = createSlice({
  name: 'mainLoader',
  initialState: {
    loading: false, 
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = mainLoaderSlice.actions;
export default mainLoaderSlice.reducer;
