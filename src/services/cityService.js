
import axiosInstance from '../api/axiosInstance'

export const cityService = {
  async getAll() {
    const response = await axiosInstance.get('/cities')
    return response.data.data
  },
}