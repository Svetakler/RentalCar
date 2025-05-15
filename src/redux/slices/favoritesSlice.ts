import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Car } from "../../types/car";

interface FavoritesState {
  items: Car[];
}

const savedFavorites = localStorage.getItem("favorites");
const initialState: FavoritesState = {
  items: savedFavorites ? JSON.parse(savedFavorites) : [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Car>) => {
      const carId = action.payload.id;
      const existingIndex = state.items.findIndex((car) => car.id === carId);

      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
