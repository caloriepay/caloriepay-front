import axios from 'axios';

const BASE_URL = 'base_url';

export const getTierByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/calendar`, date);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const getKcalDataByDate = async (date) => {
  try {
    // const response = await axios.get(`${BASE_URL}/api/calendar`, date);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          spend: [
            {
              dateTime: '1723719567',
              data: [
                {
                  id: 1,
                  memberId: 1,
                  foodKcal: 243,
                  foodName: '김치찌개',
                },
                {
                  id: 3,
                  memberId: 1,
                  foodKcal: 243,
                  foodName: '공기밥',
                  dateTime: '172371956',
                },
              ],
            },
            {
              dateTime: '1723719580',
              data: [
                {
                  id: 5,
                  memberId: 1,
                  foodKcal: 243,
                  foodName: '비빔냉면',
                },
              ],
            },
          ],
          earn: [
            {
              title: '채원이랑 헬스장',
              data: [
                {
                  id: 1,
                  memberId: 1,
                  exerciseKcal: 300,
                  exerciseName: '웨이트트레이닝',
                  exerciseTime: '60',
                },
                {
                  id: 3,
                  memberId: 1,
                  exerciseKcal: 210,
                  exerciseName: '러닝머신',
                  exerciseTime: '20',
                },
              ],
            },
          ],
        });
      }, 1000);
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error occurred');
  }
};
