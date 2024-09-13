import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BASE_URL = 'base_url';

export const getTokens = (email, password, navigation) => {
  axios
    .post(`${BASE_URL}/api/login`, {
      email,
      password,
    })
    .then((res) => {
      {
        if (res.status === 200) {
          AsyncStorage.setItem(
            'Tokens',
            JSON.stringify({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              email,
            }),
          );
          navigation.navigate('HomeTab');
        }
      }
    });
};

const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem('Tokens');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyTokens = async (navigation) => {
  const Token = await getTokenFromLocal();

  // 최초 접속
  if (Token === null) {
    navigation.reset({ routes: [{ name: 'AuthPage' }] });
  }
};

// api Interceptor

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('AccessToken');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('RefreshToken');
};

export const getNewAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('RefreshToken');
  if (refreshToken) {
    try {
      return (response = await axios.post(`${BASE_URL}/auth/refresh-token`));
    } catch (err) {
      return null;
    }
  }
};

export const saveTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('AccessToken', accessToken);
    await AsyncStorage.setItem('RefreshToken', refreshToken);
  } catch (err) {
    console.log('Error saving tokens : ', err);
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('AccessToken');
    await AsyncStorage.removeItem('RefreshToken');
  } catch (err) {
    console.log('Error removing tokens : ', err);
  }
};
