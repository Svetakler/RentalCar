import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  brand: string;
  price: number | null;
  mileageFrom: number | null;
  mileageTo: number | null;
}

const initialState: FiltersState = {
  brand: "",
  price: null,
  mileageFrom: null,
  mileageTo: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setPrice: (state, action: PayloadAction<number | null>) => {
      state.price = action.payload;
    },
    setMileageFrom: (state, action: PayloadAction<number | null>) => {
      state.mileageFrom = action.payload;
    },
    setMileageTo: (state, action: PayloadAction<number | null>) => {
      state.mileageTo = action.payload;
    },
    resetFilters: () => initialState,
  },
});
export const {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
