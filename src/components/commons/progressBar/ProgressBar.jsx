import { Text, View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default function ProgressBar({ total, used }) {
  const progress = total > 0 ? used / total : 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 남은 칼로리</Text>
      <Text style={styles.usedCalorieText}>{used} Kcal</Text>
      <Text style={styles.totalCalorieText}>/ {total}</Text>
      <Progress.Bar
        progress={progress}
        color="rgba(43, 47, 57, 1)"
        borderRadius={25}
        height={10}
        width={300}
        borderColor="gray"
        borderWidth={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 9,
  },
  usedCalorieText: {
    fontSize: 25,
    fontWeight: '700',
  },
  totalCalorieText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#878787',
    marginBottom: 9,
  },
  barColor: {
    color: '#2B2F39',
  },
});
