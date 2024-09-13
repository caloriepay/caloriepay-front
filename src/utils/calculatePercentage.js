import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screenHeight = hp(100);

export const calculatePercentage = () => {
  const minHeight = 844;
  const maxHeight = 1005;
  const minPercentage = 17;
  const maxPercentage = 20;

  const ratio = (screenHeight - minHeight) / (maxHeight - minHeight);
  return maxPercentage - ratio * (maxPercentage - minPercentage);
};
