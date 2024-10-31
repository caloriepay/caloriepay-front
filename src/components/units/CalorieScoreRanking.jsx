import MainContainer from '../commons/layout/container/MainContainer';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import * as Progress from 'react-native-progress';
import { getDate, getMonth, getYear } from 'date-fns';
import { useEffect, useState } from 'react';
import { getCalorieScoreRank } from '../../api/calorieScoreAPI';

export default function CalorieScoreRanking({}) {
  const [username, setUsername] = useState();
  const [calorieScore, setCalorieScore] = useState();
  const [rankPercentage, setRankPercentage] = useState();
  const [rank, setRank] = useState();

  const fetchRankData = async () => {
    const response = await getCalorieScoreRank();
    console.log(response);
    setUsername(response.name);
    setCalorieScore(response.score);
    setRankPercentage(response.perRank || 0);
    setRank(response.rank || 0);
  };
  useEffect(() => {
    fetchRankData();
  }, []);
  const today = new Date();
  year = getYear(today);
  month = getMonth(today) + 1;
  date = getDate(today);
  return (
    <MainContainer style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Calorie Score</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.dateText}>
          {year}년 {month}월 {date}일
        </Text>

        <View style={styles.circleContainer}>
          <Progress.Circle
            size={120}
            progress={rankPercentage ? rankPercentage / 100 : 0}
            showsText={false}
            color={globalStyles.mainColor}
            unfilledColor="#e0e0e0"
            borderWidth={0}
            thickness={10}
          />
          <Text style={styles.calorieScore}>{calorieScore}점</Text>
        </View>

        <Text style={styles.usernameText}>{username} 님</Text>
        <Text style={styles.totalRanking}>
          오늘 확인 | 상위 {rankPercentage}%
        </Text>
        <Text style={styles.friendRanking}>친구랭킹 {rank}위</Text>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: globalStyles.backgroundColor,
    padding: 20,
  },
  titleContainer: {
    backgroundColor: globalStyles.mainColor,
    borderRadius: 15,
    marginBottom: 20,
  },

  titleText: {
    fontSize: 30,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'left',
    width: '100%',
    fontWeight: 'bold',
  },

  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  dateText: {
    fontSize: 16,
    color: globalStyles.textColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  calorieScore: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: globalStyles.mainColor,
  },

  usernameText: {
    fontSize: 20,
    color: globalStyles.secondaryTextColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  totalRanking: {
    fontSize: 18,
    color: globalStyles.mainColor,
    marginBottom: 10,
  },

  friendRanking: {
    fontSize: 18,
    color: '#42A5F5',
  },
});
