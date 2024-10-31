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
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || '정의되지 않은 오류';
      console.log(`Error ${status}: ${message}`);
      return { error: true, status, message };
    } else {
      console.log('Network error or server is unreachable');
      return false;
    }
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

export const getUserInfo = async () => {
  console.log('getUserInfo');
  try {
    const response = await apiClient.get(`${BASE_URL}/api/members`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || '정의되지 않은 오류';
      console.log(`Error ${status}: ${message}`);
      return { error: true, status, message };
    } else {
      console.log('Network error or server is unreachable');
      return false;
    }
  }
};

export const editUserInfo = async (data) => {
  console.log('editUserInfo');
  console.log(JSON.stringify(data, null, 2));
  try {
    const response = await apiClient.patch(`${BASE_URL}/api/members`, data);
    console.log(JSON.stringify(response.data, null, 2));
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || '정의되지 않은 오류';
      console.log(`Error ${status}: ${message}`);
      return { error: true, status, message };
    } else {
      console.log('Network error or server is unreachable');
      return false;
    }
  }
};

export const getUserWeightRecords = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URL}/api/members/weight`);
    // console.log(JSON.stringify(response.data, null, 2));
    const fakeResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'OK',
          data: [
            {
              memberId: 1,
              weight: 89.0,
              date: [2024, 10, 31],
            },
            {
              memberId: 1,
              weight: 65.0,
              date: [2023, 10, 15],
            },
            {
              memberId: 1,
              weight: 68.0,
              date: [2023, 10, 8],
            },
            {
              memberId: 1,
              weight: 70.5,
              date: [2023, 10, 1],
            },
            {
              memberId: 1,
              weight: 70.5,
              date: [2023, 9, 1],
            },
          ],
          message: 'SUCCESS',
        });
      }, 500);
    });
    const data = {
      labels: fakeResponse?.data.map(
        (item) =>
          `${String(item.date[1]).padStart(2, '0')}.${String(item.date[2]).padStart(2, '0')}`,
      ),
      datasets: [
        {
          data: fakeResponse?.data.map((item) => item.weight),
          // strokeWidth: 4, // optional
        },
      ],
      legend: ['스코어 변화'], // optional
    };
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.log(error);
  }
};
