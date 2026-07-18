import axiosInstance from "../api/axiosInstance";

export const avisService = {
  async getByUser(userId) {
    const response = await axiosInstance.get(`/avis/user/${userId}`);
    return response.data.data;
  },
  async getByArtisan(artisanId) {
    const response = await axiosInstance.get(`/avis/artisan/${artisanId}`);
    return response.data.data;
  },
  async getAverageRating(artisanId) {
    const response = await axiosInstance.get(
      `/avis/artisan/${artisanId}/average`,
    );
    return response.data.data;
  },
  async create(data) {
    const response = await axiosInstance.post("/avis", data);
    return response.data.data;
  },
};
