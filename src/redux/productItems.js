// src/redux/prodItems.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prodState: {
    catShow: false,
    itemShow: false,
    selectedCat: null,
    selectedId: null,
  },
};

const prodItems = createSlice({
  name: 'prodItems',
  initialState,
  reducers: {
    setUIState: (state, action) => {
      const { key, value } = action.payload;
      if (state.prodState.hasOwnProperty(key)) {
        state.prodState[key] = value;
      } else {
        console.warn(`Key "${key}" does not exist in state.prodState`);
      }
    },
  },
});

export const { setUIState } = prodItems.actions;
export default prodItems.reducer;
