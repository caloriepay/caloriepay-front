import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomModalHeader } from '../../components/units/BottomModalHeader';
import { calculatePercentage } from '../../utils/calculatePercentage';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import WeeklyCalendar from '../../components/units/WeeklyCalendar';
import { useMoveToScreen } from '../../components/commons/hooks/useMoveToScreen';
import { Button } from '@rneui/base';
import CustomButton from '../../components/commons/buttons/CustomButton';
import UseEarnButton from '../../components/commons/buttons/UseEarnButton';
import { globalStyles } from '../../styles/globalStyles';
import { View } from 'react-native';

export default function HomeScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onPressMoveToPage } = useMoveToScreen();
  useEffect(() => {
    handlePresentModalPress();
  }, []);

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
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          handleComponent={() => BottomModalHeader(isModalOpen)}
        ></BottomSheetModal>
      </MainWrapper>
    </>
  );
}
