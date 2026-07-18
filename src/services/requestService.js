import axiosInstance from "../api/axiosInstance";

export const requestService = {
  async getByUser(userId) {
    const response = await axiosInstance.get(`/requests/user/${userId}`);
    return response.data.data;
  },

  async create(data) {
    const response = await axiosInstance.post("/requests", data);
    return response.data.data;
  },

  async update(id, data) {
    const response = await axiosInstance.put(`/requests/${id}`, data);
    return response.data.data;
  },

  async delete(id) {
    await axiosInstance.delete(`/requests/${id}`);
  },

  async markAsCompleted(id) {
    const response = await axiosInstance.patch(`/requests/${id}/complete`);
    return response.data.data;
  },

  async getByCityAndService(city, service) {
    const response = await axiosInstance.get("/requests/search", {
      params: { city, service },
    });
    return response.data.data;
  },
};
