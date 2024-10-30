import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getObjectRecognitionResult = async (fileUri) => {
  console.log(fileUri);
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });
  formData.append('category', 'MEAL');
  try {
    const response = await apiClient.post(`${BASE_URL}/api/upload`, formData);
    return response.data.data;
  } catch (error) {
    console.log('camera error');
    console.log(error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
