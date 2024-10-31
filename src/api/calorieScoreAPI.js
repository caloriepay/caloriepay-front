import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://${manifest2.extra.expoClient.hostUri.split(':')[0]}:8080`;

export const getCalorieAndScore = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/api/kcal`);

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
