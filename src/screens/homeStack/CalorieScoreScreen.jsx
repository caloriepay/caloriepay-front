import { StyleSheet, Text, View } from 'react-native';
import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import CalorieScoreRanking from '../../components/units/CalorieScoreRanking';
import { useEffect, useState } from 'react';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import CommonHeader from '../../components/commons/layout/header/CommonHeader';
import Graph from '../../components/commons/graph/Graph';
import { getCalorieScoreRecords } from '../../api/calorieScoreAPI';
import { globalStyles } from '../../styles/globalStyles';

export default function CalorieScoreScreen() {
  const [data, setData] = useState();
  const fetchScoreData = async () => {
    const response = await getCalorieScoreRecords();
    setData(response);
  };
  useEffect(() => {
    fetchScoreData();
  }, []);
  console.log('calorieScoreScreen');
  console.log(JSON.stringify(data, null, 2));

  return (
    <MainWrapper>
      <CalorieScoreRanking
        username="정채원"
        calorieScore="868"
        friendRanking="4"
        totalRanking="20"
      />
      <MainContainer>
        <CommonHeader leftText="스코어 그래프" />
        {data ? (
          <Graph data={data} />
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </MainContainer>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 330,
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: globalStyles.gray,
  },
});
