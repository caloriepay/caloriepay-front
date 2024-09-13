import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const BASE_URL = 'base_url';
// const navigation = useNavigation();

export const checkUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    if (response.status === 200) {
      response.headers['AccessToken'];
      response.headers['AccessToken'];
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const joinUser = async (userData) => {
  console.log('joinUser');
  console.log(userData);
  const { email, password } = userData;
  const loginData = { email, password };
  // try {
  //   await axios.post(`${BASE_URL}/api/users/join`, userData);
  //   // 로그인 API 재요청
  // } catch (error) {}
};
