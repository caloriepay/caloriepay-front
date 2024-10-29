import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../../../styles/globalStyles';
import { calculateTotalEarnKcal } from '../../../../utils/totalKcal';

export default function Receipt({ postData }) {
  const totalCaloriesBurned = calculateTotalEarnKcal(postData.exerciseRecords);
  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.title}>{postData.exerciseRecords[0]?.title}</Text>
      {postData.exerciseRecords.map((earnItem, index) => (
        <View key={`earn-${index}`}>
          <View style={styles.itemWrapper}>
            <Text style={styles.itemTitle}>
              {earnItem.exerciseTypeName}({earnItem.duration}분)
            </Text>
            <Text style={styles.itemKcal}>{earnItem.caloriesBurned} kcal</Text>
          </View>
        </View>
      ))}
      <View
        style={{
          ...styles.itemWrapper,
          borderTopWidth: 2,
          borderTopColor: '#A5A5A5',
          paddingTop: 5,
        }}
      >
        <Text style={styles.itemTitle}>총합</Text>
        <Text style={styles.totalKcal}>{totalCaloriesBurned} kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  receiptContainer: {
    marginTop: 10,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
  },
  itemTitle: {
    color: '#676767',
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemKcal: {
    color: '#878787',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalKcal: {
    color: globalStyles.mainColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
