export const authService = {
  async register(data) {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data.data;
  },
};
