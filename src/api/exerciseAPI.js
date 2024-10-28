import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
manifest2.extra.expoClient.hostUri;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getExerciseData = async () => {
  console.log('getExerciseData');
  try {
    const response = await apiClient.get(`${BASE_URL}/api/exercise`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const code = error.response?.data.data;
    const message = error.response?.data.message || '정의되지 않은 오류';
    console.log(code);
    console.log(status);
    console.log(message);
  }
};

export const earnKcalByExercise = async (data) => {
  console.log('earnKcalByExercise');
  console.log(data);
  const title = data[0].title;
  const exercise = data.map((item) => ({
    exerciseName: item.selectedItem.label,
    duration: parseInt(item.time, 10),
  }));
  const body = {
    title,
    exercise,
  };
  try {
    const response = await apiClient.post(
      `${BASE_URL}/api/exercise/record`,
      body,
    );
    console.log(JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    const status = error.response?.status;
    const code = error.response?.data.data;
    const message = error.response?.data.message || '정의되지 않은 오류';
    console.log(code);
    console.log(status);
    console.log(message);
    return false;
  }
};
