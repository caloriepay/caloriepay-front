import CalorieTier from '../commons/tier/CalorieTier';
import ProgressBar from '../commons/progressBar/ProgressBar';

import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import ScoreBoard from '../commons/scoreBoard/ScoreBoard';
import { useMoveToScreen } from '../commons/hooks/useMoveToScreen';

export default function CalorieScoreSection({
  tier,
  username,
  recommendCal,
  remainedCal,
  calorieScore,
  isSimple = false,
}) {
  const { onPressMoveToPage } = useMoveToScreen();
  return (
    <>
      {!isSimple && (
        <View style={styles.userWrapper}>
          <CalorieTier tier={tier} />
          <Text style={styles.usernameText}>
            {'  '}
            {username}
          </Text>
          <Text style={styles.subText}> 님</Text>
        </View>
      )}

      {recommendCal !== undefined && remainedCal !== undefined && (
        <ProgressBar total={recommendCal} used={remainedCal} />
      )}
      <ScoreBoard
        title="Calorie Score"
        calorieScore={calorieScore}
        isDarkMode={true}
        onPress={() => onPressMoveToPage('CalorieScore')}
      />
      <ScoreBoard
        title="지난달 건강티어"
        calorieScore={calorieScore}
        tier={tier}
        onPress={() => onPressMoveToPage('TierReport', { calorieScore })}
      />
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
