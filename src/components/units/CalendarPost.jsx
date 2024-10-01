import { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/solid';

export default function CalendarPost({
  selectedDatePosts,
  totalSpendKcal,
  totalEarnKcal,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={styles.toggleButton}>
          <Text
            style={{
              color: 'white',
              letterSpacing: 1,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            상세보기{' '}
            {isCollapsed ? (
              <ChevronDownIcon color={'white'} />
            ) : (
              <ChevronUpIcon color={'white'} />
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.kcalPostWrapper}>
        <Text style={styles.kcalPostMainText}>12월 7일(목)</Text>
        <Text style={styles.kcalPostMainText}>
          식사 · {totalSpendKcal}kcal <Text style={{ color: 'red' }}>사용</Text>
        </Text>
        <Text style={styles.kcalPostMainText}>
          운동 · {totalEarnKcal}kcal{' '}
          <Text style={{ color: globalStyles.mainColor }}>적립</Text>
        </Text>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {selectedDatePosts &&
        selectedDatePosts.spend &&
        selectedDatePosts.spend.length > 0 ? (
          selectedDatePosts.spend.map((spendItem, index) => (
            <View key={`spend-${index}`} style={styles.postContainer}>
              <Text style={styles.postTitle}>식사 기록</Text>
              {spendItem.data.map((food, idx) => (
                <View key={`food-${idx}`} style={styles.foodItem}>
                  <Text>
                    {food.foodName} - {food.foodKcal} kcal
                  </Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.nullContainer}>
            <Text style={styles.nullTitle}>이용내역이 없습니다.</Text>
          </View>
        )}
      </Collapsible>
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
  postContainer: {
    marginTop: 16,
    padding: 16,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  postTitleWrapper: {
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContents: {
    marginTop: 8,
    fontSize: 16,
  },
  nullContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: heightPercentageToDP(20),
  },
  nullTitle: {
    color: '#AEAEAE',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: globalStyles.mainColor,
    padding: 10,
  },
});
