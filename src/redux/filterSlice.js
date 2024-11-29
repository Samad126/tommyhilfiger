import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {},
  query: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;

      if (value) {
        state.filters[key] = value;
      } else {
        delete state.filters[key];
      }

      state.query = new URLSearchParams(state.filters).toString();
    },
    resetFilters(state) {
      state.filters = {};
      state.query = "";
    },
    setFiltersFromQuery(state, action) {
      const query = action.payload;
      const params = new URLSearchParams(query);
      state.filters = Object.fromEntries(params.entries());
      state.query = query;
    },
  },
});

export const { setFilter, resetFilters, setFiltersFromQuery } =
  filterSlice.actions;
export default filterSlice.reducer;
