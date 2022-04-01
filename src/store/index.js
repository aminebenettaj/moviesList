import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./reducers/movies";

const store = configureStore({
  reducer: { movies: moviesReducer },
});

export default store;
