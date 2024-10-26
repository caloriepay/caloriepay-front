import axios from 'axios';

const BASE_URL = 'base_url';

export const getCalorieAndScore = async () => {
  try {
    // const response = await axios.get(`${BASE_URL}/api/kcal`);
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
