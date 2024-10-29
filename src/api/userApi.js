import axios from 'axios';
import { saveTokens } from '../utils/jwt/tokenUtils';
import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    if (response.status === 200) {
      console.log(response.data);
      const { accessToken, refreshToken } = response.data.data;
      await saveTokens(accessToken, refreshToken);
      return true;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const joinUser = async (userData, setError) => {
  console.log('joinUser');
  try {
    const response = await axios.post(`${BASE_URL}/api/members/join`, userData);
    loginUser(userData);
    return true;
  } catch (error) {
    const status = error.response?.status;
    const code = error.response?.data.data;
    const message = error.response?.data.message || '정의되지 않은 오류';
    console.log(code);
    console.log(status);
    console.log(message);
    if (status === 400) {
      switch (code) {
        case 'ERROR-BR-003':
          setError('email', { message });
          return false;
        case 'ERROR-BR-004':
          setError('nickname', { message });
          return false;
        case 'ERROR-BR-005':
          setError('phoneNumber', { message });
          return false;
      }
    }
    return false;
  }
};

export const registerMemberProfile = async (userData) => {
  console.log('registerMemberProfile');
  console.log(userData);
  try {
    const response = await apiClient.post(
      `${BASE_URL}/api/members/profile`,
      userData,
    );
    console.log('회원가입 완료:', response.data);
    return true;
  } catch (error) {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    console.log(status);
    console.log(code);
    console.log(error);
  }
};
