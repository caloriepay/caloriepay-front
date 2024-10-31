import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getMonthTier = async (year, month) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/api/tier/month`, {
      params: {
        year,
        month,
      },
    });
    if (response?.data?.data === null) return null;
    return {
      tier: response?.data?.data?.tier,
      date: response?.data?.data?.date,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getMonthTierAmount = async (year, month) => {
  console.log(`getMonthTierAmount: ${year}/${month}`);
  try {
    const response = await apiClient.get(`${BASE_URL}/api/tier/month/amount`, {
      params: {
        date: `${year}-${month}-01`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
