import MainContainer from '../commons/layout/container/MainContainer';
import CustomButton from '../commons/buttons/CustomButton';
import CalorieTier from '../commons/tier/CalorieTier';
import ProgressBar from '../commons/progressBar/ProgressBar';

import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function CalorieScoreSection({
  tier,
  username,
  recommendCal,
  remainedCal,
  calorieScore,
}) {
  return (
    <>
      <View style={styles.userWrapper}>
        <CalorieTier tier={tier} />
        <Text style={styles.usernameText}>
          {'  '}
          {username}
        </Text>
        <Text style={styles.subText}> 님</Text>
      </View>
      {recommendCal !== undefined && remainedCal !== undefined && (
        <ProgressBar total={recommendCal} used={remainedCal} />
      )}
      <MainContainer
        backgroundColor={globalStyles.scoreBackgroundColor}
        hasShadow={false}
        containerStyle={styles.calorieScoreWrapper}
      >
        <Text style={styles.calorieScoreTitle}>
          Calorie Score | {calorieScore}점
        </Text>
        <CustomButton
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          title="확인하기"
          titleStyle={styles.buttonTitle}
          icon={{
            name: 'chevron-right',
            type: 'font-awesome',
            size: 10,
            color: 'white',
          }}
          iconPosition="right"
          iconContainerStyle={styles.iconContainerStyle}
        />
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 20,
  },
  calorieScoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  calorieScoreTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonStyle: {
    width: 90,
    height: 30,
    backgroundColor: globalStyles.scoreGrayColor,
  },
  containerStyle: {
    width: 100,
    height: 30,
    marginBottom: 0,
  },
  buttonTitle: {
    fontSize: 12,
  },
  iconContainerStyle: {
    marginRight: 0,
  },
});
