import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice";
import filtersReducer from "./slices/filtersSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
