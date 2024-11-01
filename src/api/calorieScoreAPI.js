import apiClient from './apiInterceptor';
import Constants from 'expo-constants';

const { manifest2 } = Constants;
const BASE_URL = `http://54.180.138.130:8080`;

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
    const response = await apiClient.get(`${BASE_URL}/api/kcal/change`, {
      params: { offset: 5 },
    });
    console.log(JSON.stringify(response.data, null, 2));
    const validData = response?.data?.data.filter((item) => item !== null);
    console.log(JSON.stringify(validData, null, 2));
    const data = {
      labels: validData.map(
        (item) =>
          `${String(item.date[1]).padStart(2, '0')}.${String(item.date[2]).padStart(2, '0')}`,
      ),
      datasets: [
        {
          data: validData.map((item) => item.score),
        },
      ],
      legend: ['스코어 변화'],
    };
    const combinedData = data.labels.map((label, index) => ({
      label: label,
      value: data.datasets[0].data[index],
    }));

    combinedData.sort((a, b) => {
      const monthA = parseInt(a.label.split('.')[0], 10);
      const monthB = parseInt(b.label.split('.')[0], 10);
      return monthA - monthB;
    });

    data.labels = combinedData.map((item) => item.label);
    data.datasets[0].data = combinedData.map((item) => item.value);
    console.log(JSON.stringify(data, null, 2));
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
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getHighestScoreInMonth = async (year, month) => {
  console.log(`getHighest : ${year}/${month}`);
  try {
    const response = await apiClient.get(`${BASE_URL}/api/kcal/month`, {
      params: {
        date: `${year}-${month}-01`,
      },
    });
    return response?.data?.data?.score || ' - ';
  } catch (error) {
    console.log('여긴가');
    console.log(error);
  }
};
