import axios from 'axios';
import {
  getAccessToken,
  getNewAccessToken,
  getRefreshToken,
  saveTokens,
  removeTokens,
} from '../utils/jwt/tokenUtils';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers['Access-Token'] = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        // refresh 토큰으로 access 토큰 재발급
        const response = await getNewAccessToken();
        if (response.status === 200) {
          const { accessToken: newAccessToken, refreshToken } = response.data;
          await saveTokens(newAccessToken, refreshToken);
          apiClient.defaults.headers.Authorization = newAccessToken; // 수정
          originalRequest.headers.Authorization = newAccessToken;
          return apiClient(originalRequest);
        } else if (response.status === 404) {
          // refresh 토큰 만료
          await removeTokens();
          navigation.reset({
            index: 0,
            routes: [{ name: 'initial' }],
          });
        } else {
          console.log('hi');
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
