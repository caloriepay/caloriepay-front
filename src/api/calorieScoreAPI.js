import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getCalorieAndScore = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/api/kcal`);
    console.log('calorieScore response data');
    console.log(JSON.stringify(response.data, null, 2));
    const defaultData = {
      calorieScore: {
        name: 'Unknown',
        score: ' - ',
      },
      calorieChange: {
        dailyRecommendedCalorie: 0,
        remainCalorie: 0,
      },
    };

    const data = {
      calorieScore: {
        name:
          response.data.data?.calorieScore?.name ??
          defaultData.calorieScore.name,
        score:
          response.data.data?.calorieScore?.score ??
          defaultData.calorieScore.score,
      },
      calorieChange: {
        dailyRecommendedCalorie:
          response.data.data?.calorieChange?.dailyRecommendedCalorie ??
          defaultData.calorieChange.dailyRecommendedCalorie,
        remainCalorie:
          response.data.data?.calorieChange?.remainCalorie ??
          defaultData.calorieChange.remainCalorie,
      },
    };

    const returnData = {
      name: data.calorieScore.name,
      dailyRecommendedCalorie: data.calorieChange.dailyRecommendedCalorie,
      remainCalorie: data.calorieChange.remainCalorie,
      score: data.calorieScore.score,
    };

    console.log(returnData);
    return returnData;
  } catch (error) {
    console.log(error);
  }
};

export const getCalorieScoreRecords = async () => {
  try {
    // const response = await apiClient.get(`${BASE_URL}/api/kcal/change`);
    // console.log(JSON.stringify(response.data, null, 2));
    // return response.data.data;
    const fakeResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'OK',
          data: [
            {
              id: 30,
              userId: 2,
              name: '지웅',
              date: [2024, 10, 29],
              score: 500,
            },
            {
              id: 32,
              userId: 2,
              name: '지웅',
              date: [2024, 9, 28],
              score: 200,
            },
            {
              id: 35,
              userId: 2,
              name: '지웅',
              date: [2024, 8, 28],
              score: 190,
            },
            {
              id: 33,
              userId: 2,
              name: '지웅',
              date: [2024, 7, 28],
              score: 20,
            },
            {
              id: 34,
              userId: 2,
              name: '지웅',
              date: [2024, 6, 28],
              score: 0,
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
          data: fakeResponse?.data.map((item) => item.score),
          // strokeWidth: 4, // optional
        },
      ],
      legend: ['스코어 변화'], // optional
    };
    console.log(JSON.stringify(data, null, 2));

    // console.log(JSON.stringify(fakeResponse, null, 2));
    // return fakeResponse.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCalorieScoreRank = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/api/kcal/rank/member`);
    const prefix = response?.data?.data;
    const returnData = {
      name: prefix.name || '정채원',
      score: prefix.score || 868,
      rank: prefix.rank || 4,
      perRank: prefix.perRank || 20,
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
};

export const getCalorieScoreTotalRank = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/api/kcal/rank`);
    console.log(JSON.stringify(response.data, null, 2));
    // return [
    //   {
    //     id: 1,
    //     userId: 1,
    //     name: '홍길동',
    //     date: [2024, 10, 30],
    //     score: 300,
    //     rank: 1,
    //     perRank: null,
    //   },
    //   {
    //     id: 2,
    //     userId: 2,
    //     name: '이순신',
    //     date: [2024, 10, 31],
    //     score: 280,
    //     rank: 2,
    //     perRank: null,
    //   },
    //   {
    //     id: 3,
    //     userId: 3,
    //     name: '강감찬',
    //     date: [2024, 10, 31],
    //     score: 260,
    //     rank: 3,
    //     perRank: null,
    //   },
    //   {
    //     id: 4,
    //     userId: 4,
    //     name: '을지문덕',
    //     date: [2024, 10, 31],
    //     score: 240,
    //     rank: 4,
    //     perRank: null,
    //   },
    //   {
    //     id: 5,
    //     userId: 5,
    //     name: '세종대왕',
    //     date: [2024, 10, 31],
    //     score: 220,
    //     rank: 5,
    //     perRank: null,
    //   },
    //   {
    //     id: 6,
    //     userId: 6,
    //     name: '김유신',
    //     date: [2024, 10, 31],
    //     score: 200,
    //     rank: 6,
    //     perRank: null,
    //   },
    //   {
    //     id: 7,
    //     userId: 7,
    //     name: '신사임당',
    //     date: [2024, 10, 31],
    //     score: 180,
    //     rank: 7,
    //     perRank: null,
    //   },
    //   {
    //     id: 8,
    //     userId: 8,
    //     name: '장영실',
    //     date: [2024, 10, 31],
    //     score: 160,
    //     rank: 8,
    //     perRank: null,
    //   },
    //   {
    //     id: 9,
    //     userId: 9,
    //     name: '유관순',
    //     date: [2024, 10, 31],
    //     score: 140,
    //     rank: 9,
    //     perRank: null,
    //   },
    //   {
    //     id: 10,
    //     userId: 10,
    //     name: '이방원',
    //     date: [2024, 10, 31],
    //     score: 120,
    //     rank: 10,
    //     perRank: null,
    //   },
    // ];
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
