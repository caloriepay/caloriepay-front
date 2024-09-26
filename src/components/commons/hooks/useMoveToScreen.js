import { useNavigation } from '@react-navigation/native';

export const useMoveToScreen = () => {
  const navigation = useNavigation();
  const onPressMoveToPage = (path, param) => {
    navigation.navigate(path, param);
  };
  const onPressGoBack = () => {
    navigation.goBack();
  };
  return {
    onPressMoveToPage,
    onPressGoBack,
  };
};
