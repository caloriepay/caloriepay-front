import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../../../styles/globalStyles';
import { calculateTotalEarnKcal } from '../../../../utils/totalKcal';

export default function Receipt({ postData, isMeal = false }) {
  const totalCaloriesBurned = calculateTotalEarnKcal(postData.exerciseRecords);

  const formatTo12Hour = (hour, minute) => {
    const period = hour >= 12 ? '오후' : '오전';
    const adjustedHour = hour % 12 || 12;
    return `${period} ${adjustedHour}시 ${minute}분`;
  };

  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.title}>{postData[0]?.title}</Text>
      {postData.map((item, index) => (
        <View key={`earn-${index}`}>
          {isMeal ? (
            <View style={styles.mealWrapper}>
              <Text style={styles.timeText}>
                {formatTo12Hour(item?.mealTime[3], item?.mealTime[4])}
              </Text>
              {item.foods.map((food, idx) => (
                <View key={`food-${idx}`} style={styles.itemWrapper}>
                  <Text style={styles.itemTitle}>{food.foodName}</Text>
                  <Text style={styles.itemKcal}>{food.calorie} kcal</Text>
                </View>
              ))}
              <View
                style={{
                  ...styles.itemWrapper,
                  borderTopWidth: 2,
                  borderTopColor: '#A5A5A5',
                  paddingTop: 5,
                  paddingBottom: 26,
                  borderBottomWidth: 1,
                  marginBottom: 20,
                }}
              >
                <Text style={styles.itemTitle}>총합</Text>
                <Text style={styles.totalKcal}>{item.totalCalorie} kcal</Text>
              </View>
            </View>
          ) : (
            <View style={styles.itemWrapper}>
              <Text style={styles.itemTitle}>
                {item.exerciseTypeName}({item.duration}분)
              </Text>
              <Text style={styles.itemKcal}>{item.caloriesBurned} kcal</Text>
            </View>
          )}
        </View>
      ))}
      {!isMeal && (
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
      )}
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
  timeText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
    marginBottom: 10,
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
