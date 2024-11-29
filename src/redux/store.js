import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice.js";
import categoryReducer from "./categorySlice.js";
import mainLoaderReducer from "./mainLoaderSlice.js";
import singItemReducer from "./singleItemSlice.js";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    mainLoader: mainLoaderReducer,
    singleItem: singItemReducer,
  },
});

export default store;
