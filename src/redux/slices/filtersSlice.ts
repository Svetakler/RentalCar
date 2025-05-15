import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Filters } from "../../types/filters";

const initialState: Filters = {
  brand: "",
  price: "",
  from: "",
  to: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
