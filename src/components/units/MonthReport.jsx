import MainContainer from '../commons/layout/container/MainContainer';
import CalorieTier from '../commons/tier/CalorieTier';
import { getMonth, getYear, addMonths, subMonths } from 'date-fns';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useState } from 'react';
import { Button } from '@rneui/base';
import { getMonthTier, getMonthTierAmount } from '../../api/tierAPI';
import { useEffect } from 'react';
import { getHighestScoreInMonth } from '../../api/calorieScoreAPI';

export default function MonthReport({ calorieScore }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tier, setTier] = useState();
  const [tierCount, setTierCount] = useState({ S: 0, A: 0, B: 0, C: 0, D: 0 });
  const [monthScore, setMonthScore] = useState();

  const year = getYear(selectedDate);
  const month = getMonth(selectedDate) + 1;

  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };
  const fetchTierData = async (date) => {
    const year = getYear(date);
    const month = getMonth(date) + 1;
    const monthTierData = await getMonthTier(year, month);
    const monthScoreData = await getHighestScoreInMonth(year, month);
    setMonthScore(monthScoreData);
    setTier(monthTierData?.tier);
    const response = await getMonthTierAmount(year, month);
    const tierAmounts = { S: 0, A: 0, B: 0, C: 0, D: 0 };
    if (response) {
      response.forEach((item) => {
        tierAmounts[item.tier] = item.amount;
      });
    }
    setTierCount(tierAmounts);
  };
  useEffect(() => {
    fetchTierData(selectedDate);
  }, [selectedDate]);

  return (
    <MainContainer>
      <View style={styles.dateContainer}>
        <Button onPress={handlePrevMonth} buttonStyle={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </Button>
        <Text style={styles.dateText}>
          {year}년 {month}월
        </Text>
        <Button onPress={handleNextMonth} buttonStyle={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </Button>
      </View>

      <Text style={styles.monthQuestionText}>{month}월 나의 건강티어는?</Text>

      <View style={styles.centeredContent}>
        <CalorieTier tier={tier} containerStyle={{ width: 86, height: 119 }} />
        <Text style={styles.mainTierText}>{tier} 등급</Text>
      </View>
      <View style={styles.tierRow}>
        {['S', 'A', 'B', 'C', 'D'].map((tier) => (
          <View key={tier} style={styles.tierItem}>
            <CalorieTier
              isCount={true}
              count={tierCount[tier]}
              tier={tier}
              containerStyle={styles.smallTierStyle}
            />
            <Text style={styles.tierLabel}>{tier}</Text>
          </View>
        ))}
      </View>

      <MainContainer
        backgroundColor={globalStyles.scoreBackgroundColor}
        hasShadow={false}
      >
        <Text style={styles.calorieScoreStyle}>
          {month}월 최고 Calorie Score | {monthScore || ' - '}점
        </Text>
      </MainContainer>

      <Text style={styles.commentStyle}>
        하루하루 성실한 식단기록과 운동은{'\n'}
        건강 티어를 올리고{'\n'}
        Calorie Score를 높이는데 도움이 되요!{'\n'}
      </Text>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  arrowButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 10,
    fontWeight: 'bold',
    marginHorizontal: 'auto',
  },
  monthQuestionText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  centeredContent: {
    alignItems: 'center',
    marginVertical: 15,
  },
  mainTierStyle: {
    fontSize: 30,
  },
  mainTierText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  tierRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tierItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  smallTierStyle: {
    fontSize: 15,
  },
  tierLabel: {
    fontSize: 16,
    marginTop: 5,
  },
  calorieScoreStyle: {
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'space-around',
    color: 'white',
  },
  commentStyle: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    fontWeight: 'bold',
  },
});
