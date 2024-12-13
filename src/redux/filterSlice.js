import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {},
  initialFilters: {},
  importantFilters: {},
};

export function getInitialFilters() {
  const paramsArr = Object.entries(
    Object.fromEntries(new URLSearchParams(location.search).entries())
  ).filter(
    (filter) =>
      filter[0] === "categoryId" ||
      filter[0] === "subcategoryId" ||
      filter[0] === "limit"
  );

  let updatedParamsObj = {};
  paramsArr.forEach((element) => {
    updatedParamsObj[element[0]] = element[1];
  });

  return updatedParamsObj;
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;

      if (value !== undefined && value !== null) {
        state.filters[key] = value;
        console.log(key);
        if (key !== "sortBy" && key !== "sortOrder")
          state.importantFilters[key] = value;
      } else {
        delete state.filters[key];
        if (key !== "sortBy" && key !== "sortOrder")
          delete state.importantFilters[key];
      }
    },
    setInitialFilter(state, action) {
      state.initialFilters = action.payload.updatedParamsObj;
      state.importantFilters = action.payload.updatedImportantParams;
    },
    resetImportantFilter(state) {
      state.importantFilters = {};
    },
    resetFilters(state) {
      state.filters = getInitialFilters();
      state.importantFilters = {};
    },
    setFiltersFromQuery(state, action) {
      const query = action.payload;
      const params = new URLSearchParams(query);

      state.filters = {};

      for (const [key, value] of params.entries()) {
        if (["size", "color"].includes(key)) {
          state.filters[key] = value.includes(",") ? value.split(",") : [value];
        } else {
          state.filters[key] = value;
        }
      }
    },
  },
});

export const {
  setFilter,
  resetFilters,
  setFiltersFromQuery,
  setInitialFilter,
  resetImportantFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
