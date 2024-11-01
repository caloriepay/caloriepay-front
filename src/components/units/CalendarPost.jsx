import { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/solid';
import CaloriePostHeader from '../commons/caloriePost/CaloriePostHeader';
import CaloriePostDetail from '../commons/caloriePost/CaloriePostDetail';

export default function CalendarPost({
  selectedDatePosts,
  totalSpendKcal,
  totalEarnKcal,
  today,
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
      <CaloriePostHeader
        caloriePostData={selectedDatePosts}
        today={today}
        totalEarnKcal={totalEarnKcal}
        totalSpendKcal={totalSpendKcal}
      />
      <Collapsible collapsed={isCollapsed}>
        <CaloriePostDetail
          caloriePostData={selectedDatePosts}
          totalEarnKcal={totalEarnKcal}
          totalSpendKcal={totalSpendKcal}
        />
      </Collapsible>
    </>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: globalStyles.mainColor,
    padding: 10,
  },
});
