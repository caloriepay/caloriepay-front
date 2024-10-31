import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomModalHeader } from '../../components/units/BottomModalHeader';
import { calculatePercentage } from '../../utils/calculatePercentage';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import WeeklyCalendar from '../../components/units/WeeklyCalendar';
import { useMoveToScreen } from '../../components/commons/hooks/useMoveToScreen';
import UseEarnButton from '../../components/commons/buttons/UseEarnButton';
import { globalStyles } from '../../styles/globalStyles';
import { View } from 'react-native';
import { getCalorieAndScore } from '../../api/calorieScoreAPI';
import { useLoading } from '../../context/loadingContext';
import CustomButton from '../../components/commons/buttons/CustomButton';
import CalorieScoreSection from '../../components/units/CalorieScoreSection';
import { dateToMmDd } from '../../utils/date';
import { getKcalDataByDate } from '../../api/calendarAPI';
import {
  calculateTotalEarnKcal,
  calculateTotalSpendKcal,
} from '../../utils/totalKcal';
import CaloriePostHeader from '../../components/commons/caloriePost/CaloriePostHeader';
import CaloriePostDetail from '../../components/commons/caloriePost/CaloriePostDetail';

import MonthReport from '../../components/units/MonthReport';
import { getMonthTier } from '../../api/tierAPI';

export default function HomeScreen() {
  const { onPressMoveToPage } = useMoveToScreen();
  const { showLoading, hideLoading } = useLoading();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [recommendCal, setRecommendCal] = useState();
  const [remainedCal, setRemainedCal] = useState();
  const [calorieScore, setCalorieScore] = useState();
  const [tier, setTier] = useState();

  const [todayPost, setTodayPost] = useState();
  const [totalSpendKcal, setTotalSpendKcal] = useState();
  const [totalEarnKcal, setTotalEarnKcal] = useState();

  const today = new Date();
  const formatDate = today.toLocaleDateString('en-CA');

  const fetchHomeData = async () => {
    showLoading();
    try {
      const tierData = await getMonthTier(
        formatDate.split('-')[0],
        parseInt(formatDate.split('-')[1]) - 1,
      );
      const calorieResponse = await getCalorieAndScore();
      const todayPostData = await getKcalDataByDate(formatDate);
      setTier(tierData?.tier);
      setTodayPost(todayPostData);
      setTotalEarnKcal(calculateTotalEarnKcal(todayPostData.exerciseRecords));
      setTotalSpendKcal(calculateTotalSpendKcal(todayPostData.mealRecords));
      console.log('calorieResponse : ', calorieResponse);
      setUsername(calorieResponse?.name);
      setRecommendCal(parseInt(calorieResponse?.dailyRecommendedCalorie));
      setRemainedCal(parseInt(calorieResponse?.remainCalorie));
      setCalorieScore(calorieResponse?.score);
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchHomeData();
    handlePresentModalPress();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
    }, []),
  );

  const percentage = useMemo(() => calculatePercentage(), []);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [`${percentage}`, '100%'], [percentage]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    setIsModalOpen(index > 0);
  }, []);

  return (
    <>
      <MainWrapper>
        <MainContainer>
          <CalorieScoreSection
            username={username}
            calorieScore={calorieScore}
            tier={tier}
            remainedCal={remainedCal}
            recommendCal={recommendCal}
          />
        </MainContainer>
        <MainContainer containerStyle={{ marginBottom: 0 }}>
          <WeeklyCalendar onPressFooter={() => onPressMoveToPage('Calendar')} />
        </MainContainer>
        <View style={{ flexDirection: 'row' }}>
          <UseEarnButton
            color={globalStyles.red}
            text="사용하기"
            onPress={() => onPressMoveToPage('Cam')}
          />
          <UseEarnButton
            color={globalStyles.mainColor}
            text="적립하기"
            icon={true}
            onPress={() => onPressMoveToPage('Exercise')}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          handleComponent={() => BottomModalHeader(isModalOpen)}
        >
          <BottomSheetScrollView style={{ marginBottom: 100 }}>
            <MainContainer containerStyle={{ marginBottom: 0 }}>
              <CalorieScoreSection
                username={username}
                calorieScore={calorieScore}
                tier={tier}
                remainedCal={remainedCal}
                recommendCal={recommendCal}
                isSimple={true}
              />
            </MainContainer>
            <MainContainer containerStyle={{ marginBottom: 0 }}>
              {todayPost && (
                <CaloriePostHeader
                  totalSpendKcal={totalSpendKcal}
                  totalEarnKcal={totalEarnKcal}
                  today={dateToMmDd(formatDate)}
                />
              )}
            </MainContainer>
            <MainContainer containerStyle={{ marginBottom: 0 }}>
              <CaloriePostDetail caloriePostData={todayPost} />
            </MainContainer>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </MainWrapper>
    </>
  );
}
