import axiosInstance from "../api/axiosInstance";

export const artisanService = {
  async register(data) {
    const response = await axiosInstance.post("/artisans", data);
    return response.data.data;
  },

  async update(id, data) {
    const response = await axiosInstance.put(`/artisans/${id}`, data);
    return response.data.data;
  },

  async getAll() {
    const response = await axiosInstance.get("/artisans");
    return response.data.data;
  },

  async getByCityAndService(city, service) {
    const response = await axiosInstance.get("/artisans/search", {
      params: { city, service },
    });
    return response.data.data;
  },

  async getById(id) {
    const response = await axiosInstance.get(`/artisans/${id}`);
    return response.data.data;
  },

  async getNearby(lat, lng, radiusKm = 20) {
    const response = await axiosInstance.get("/artisans/nearby", {
      params: { lat, lng, radiusKm },
    });
    return response.data.data;
  },
};
