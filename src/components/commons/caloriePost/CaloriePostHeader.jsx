import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

export default function CaloriePostHeader({
  totalEarnKcal,
  totalSpendKcal = 0,
  today,
}) {
  return (
    <>
      {totalEarnKcal !== undefined && (
        <View style={styles.kcalPostWrapper}>
          <Text style={{ ...styles.kcalPostMainText, color: 'black' }}>
            {today}
          </Text>
          <Text style={styles.kcalPostMainText}>
            식사 · {totalSpendKcal}kcal{' '}
            <Text style={{ color: 'red' }}>사용</Text>
          </Text>
          <Text style={styles.kcalPostMainText}>
            운동 · {totalEarnKcal}kcal{' '}
            <Text style={{ color: globalStyles.mainColor }}>적립</Text>
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  kcalPostWrapper: {
    padding: 15,
  },
  kcalPostMainText: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
