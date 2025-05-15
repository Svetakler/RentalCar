import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCars } from "../../services/api";
import type { Car } from "../../types/car";
import type { Filters } from "../../types/filters";

interface CarsState {
  items: Car[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: CarsState = {
  items: [],
  isLoading: false,
  error: null,
  hasMore: true,
};

export const fetchCars = createAsyncThunk<
  Car[],
  { page: number; filters?: Filters }
>("cars/fetchCars", async ({ page = 1, filters }, { rejectWithValue }) => {
  try {
    const response = await getAllCars(page, 12, filters);
    const carsData = Array.isArray(response.data)
      ? response.data
      : response.data?.cars ?? [];

    return carsData;
  } catch (error) {
    return rejectWithValue("Failed to fetch cars");
  }
});

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    resetCars: (state) => {
      state.items = [];
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.isLoading = false;

        if (action.payload.length < 12) {
          state.hasMore = false;
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
