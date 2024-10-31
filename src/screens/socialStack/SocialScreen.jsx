import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import { useEffect, useState } from 'react';
import {
  getCalorieScoreRank,
  getCalorieScoreTotalRank,
} from '../../api/calorieScoreAPI';

export default function SocialScreen() {
  const [userRankData, setUserRankData] = useState();
  const [totalRankData, setTotalRankData] = useState();

  const fetchRankData = async () => {
    const userRankResponse = await getCalorieScoreRank();
    const totalRankResponse = await getCalorieScoreTotalRank();
    setUserRankData(userRankResponse);
    setTotalRankData(totalRankResponse);
  };

  useEffect(() => {
    fetchRankData();
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return styles.firstPlace;
    if (rank === 2) return styles.secondPlace;
    if (rank === 3) return styles.thirdPlace;
    return styles.defaultRank;
  };

  return (
    <MainWrapper>
      <MainContainer containerStyle={{ marginBottom: 0 }}>
        <View style={styles.usernameTitleWrapper}>
          <Text style={styles.usernameTitle}>{userRankData?.name} 님</Text>
        </View>
        <View style={styles.subtitleWrapper}>
          <Text style={styles.subtitleText}>전체 순위</Text>
          <Text style={styles.subtitleText}>Calorie{'\n'} score</Text>
        </View>
        <View style={styles.headerRow}></View>
        <View style={styles.subtitleWrapper}>
          <Text style={styles.myRankTitle}>{userRankData?.rank}위</Text>
          <Text style={styles.subtitleText}>{userRankData?.score}점</Text>
        </View>
      </MainContainer>
      <MainContainer>
        <Text style={styles.title}>전체 랭킹</Text>
        <View style={[styles.rankItem, styles.headerRow]}>
          <Text style={styles.headerText}>순위</Text>
          <Text style={styles.headerText}>이름</Text>
          <Text style={styles.headerText}>Calorie{'\n'} score</Text>
          <Text style={styles.headerText}>갱신일</Text>
        </View>
        {totalRankData?.length > 0 ? (
          totalRankData.map((item) => (
            <View key={item.id} style={styles.rankItem}>
              <Text style={[styles.rankText, getRankColor(item.rank)]}>
                {item.rank}위
              </Text>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.scoreText}>{item.score}점</Text>
              <Text style={styles.dateText}>
                {`${item.date[0]}/${item.date[1]}/${item.date[2]}`}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>순위 데이터가 없습니다.</Text>
        )}
      </MainContainer>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  usernameTitleWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  usernameTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitleWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  myRankTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  rankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#A9A9A9',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rankText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  scoreText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  dateText: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  firstPlace: {
    color: '#FFD700',
    fontSize: 30,
  },
  secondPlace: {
    color: '#C0C0C0',
    fontSize: 25,
  },
  thirdPlace: {
    color: '#CD7F32',
    fontSize: 21,
  },
  defaultRank: {
    color: '#333',
  },
});
