import axios from "axios";
import type { Filters } from "../types/filters";

const API_BASE_URL = "https://car-rental-api.goit.global";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllCars = async (page = 1, limit = 12, filters?: Filters) => {
  try {
    const params: Record<string, string | number> = { page, limit };

    if (filters?.brand) {
      params.brand = filters.brand;
    }

    if (filters?.price) {
      params.rentalPrice = filters.price;
    }

    if (filters?.from) {
      params.minMileage = filters.from;
    }

    if (filters?.to) {
      params.maxMileage = filters.to;
    }

    const response = await api.get("/cars", {
      params,
    });
    return response;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getCarById = async (id: string) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error);
    throw error;
  }
};

export const getUniqueBrands = async (): Promise<string[]> => {
  try {
    const response = await api.get("/brands");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};
