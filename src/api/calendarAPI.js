import axios from 'axios';

const BASE_URL = 'base_url';

export const getTierByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/calendar`, date);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
