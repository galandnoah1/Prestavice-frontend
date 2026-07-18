import axiosInstance from "../api/axiosInstance";

export const userService = {
  async update(id, data) {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data.data;
  },
};
