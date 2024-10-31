import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import MonthReport from '../../components/units/MonthReport';
import { useRoute } from '@react-navigation/native';

export default function MonthTierReportScreen() {
  const route = useRoute();
  const { calorieScore } = route.params;
  return (
    <MainWrapper>
      <MonthReport calorieScore={calorieScore} />
    </MainWrapper>
  );
}
