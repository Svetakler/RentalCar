import axios from "axios";

const API_BASE_URL = "https://car-rental-api.goit.global";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Отримати всі авто
export const getAllCars = async (page = 1, limit = 12) => {
  try {
    const response = await api.get("/cars", {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

// Отримати авто за ID
export const getCarById = async (id: string) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error);
    throw error;
  }
};

// 🆕 Отримати унікальні бренди

export const getUniqueBrands = async (): Promise<string[]> => {
  try {
    const response = await api.get("/brands");
    return response.data; // API повертає масив рядків
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};
