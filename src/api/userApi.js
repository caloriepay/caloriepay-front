import axios from 'axios';
import { saveTokens } from '../utils/jwt/tokenUtils';
import apiClient from './apiInterceptor';
import { BASE_URL } from './config';

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
  const transformedData = {
    email: data.email,
    nickname: data.nickname,
    phoneNumber: data.phoneNumber,
    age: String(data.profile.age),
    height: String(data.profile.height),
    weight: String(data.profile.weight),
    targetWeight: String(data.profile.targetWeight),
    gender: data.profile.gender.toUpperCase(),
    goal: data.profile.goal.toUpperCase(),
  };
  try {
    const response = await apiClient.patch(
      `${BASE_URL}/api/members`,
      transformedData,
    );
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
    const response = await apiClient.get(`${BASE_URL}/api/members/weight`);
    console.log(JSON.stringify(response.data, null, 2));
    const data = {
      labels: response?.data?.data.map(
        (item) =>
          `${String(item.date[1]).padStart(2, '0')}.${String(item.date[2]).padStart(2, '0')}`,
      ),
      datasets: [
        {
          data: response?.data?.data.map((item) => item.weight),
        },
      ],
      legend: ['체중 변화'],
    };
    const combinedData = data.labels.map((label, index) => ({
      label: label,
      value: data.datasets[0].data[index],
    }));

    // Sort combined data by month and day
    combinedData.sort((a, b) => {
      const [monthA, dayA] = a.label.split('.').map(Number);
      const [monthB, dayB] = b.label.split('.').map(Number);

      if (monthA !== monthB) {
        return monthA - monthB; // Sort by month
      } else {
        return dayA - dayB; // Sort by day if months are equal
      }
    });

    // Separate sorted labels and data
    data.labels = combinedData.map((item) => item.label);
    data.datasets[0].data = combinedData.map((item) => item.value);
    return data;
  } catch (error) {
    console.log(error);
  }
};
