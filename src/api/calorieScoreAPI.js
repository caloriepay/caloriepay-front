import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getCalorieAndScore = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URL}/api/kcal`);
    // console.log(response.data);
    const fakeResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            name: '정채원',
            recommendKcal: 2100,
            remainKcal: 780,
            score: 868,
          },
        });
      }, 1000);
    });
    return fakeResponse.data;
    // return response.data;
  } catch (error) {
    console.log(error);
  }
};
