import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UseEarnTabButton from '../buttons/UseEarnTabButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Receipt from '../layout/receipt/Receipt';

export default function CaloriePostDetail({
  caloriePostData,
  totalEarnKcal,
  totalSpendKcal,
}) {
  const [activeTab, setActiveTab] = useState('spend');
  return (
    <>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>이용 내역</Text>
      </View>
      <View style={styles.buttonContainer}>
        <UseEarnTabButton
          title="사용"
          isActive={activeTab === 'spend'}
          onPress={() => setActiveTab('spend')}
        />
        <UseEarnTabButton
          title="적립"
          isActive={activeTab === 'earn'}
          onPress={() => setActiveTab('earn')}
        />
      </View>
      {activeTab === 'spend' && caloriePostData?.mealRecords?.length > 0 ? (
        <>
          <Receipt
            postData={caloriePostData.mealRecords}
            isMeal={true}
            totalEarnKcal={totalEarnKcal}
            totalSpendKcal={totalSpendKcal}
          />
        </>
      ) : activeTab === 'spend' ? (
        <View style={styles.nullContainer}>
          <Text style={styles.nullTitle}>이용내역이 없습니다.</Text>
        </View>
      ) : null}

      {activeTab === 'earn' && caloriePostData?.exerciseRecords?.length > 0 ? (
        <View>
          <Receipt
            postData={caloriePostData.exerciseRecords}
            totalEarnKcal={totalEarnKcal}
            totalSpendKcal={totalSpendKcal}
          />
        </View>
      ) : activeTab === 'earn' ? (
        <View style={styles.nullContainer}>
          <Text style={styles.nullTitle}>이용내역이 없습니다.</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
