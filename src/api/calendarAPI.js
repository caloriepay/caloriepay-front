import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getTierByDate = async (date) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/api/calendar`, {
      params: date,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const getKcalDataByDate = async (date) => {
  console.log('getKcalDateByDate');
  try {
    const response = await apiClient.get(`${BASE_URL}/api/calendar/detail`, {
      params: { date },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error occurred');
  }
};
