
import axiosInstance from '../api/axiosInstance'

export const serviceService = {
  async getAll() {
    const response = await axiosInstance.get('/services')
    return response.data.data
  },
}