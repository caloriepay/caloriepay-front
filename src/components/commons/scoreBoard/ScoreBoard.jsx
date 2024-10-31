import { View, Text, StyleSheet } from 'react-native';
import MainContainer from '../layout/container/MainContainer';
import CustomButton from '../buttons/CustomButton';
import { globalStyles } from '../../../styles/globalStyles';
import CalorieTier from '../tier/CalorieTier';

export default function ScoreBoard({
  title,
  calorieScore,
  isDarkMode,
  onPress,
}) {
  return (
    <MainContainer
      backgroundColor={
        isDarkMode ? globalStyles.scoreBackgroundColor : globalStyles.gray
      }
      hasShadow={false}
      containerStyle={styles.calorieScoreWrapper}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={styles.calorieScoreTitle}>{title}</Text>
        {isDarkMode ? (
          <Text style={styles.calorieScoreTitle}> | {calorieScore}점</Text>
        ) : (
          <>
            <Text style={styles.calorieScoreTitle}> | </Text>
            <CalorieTier containerStyle={{ width: 18, height: 24 }} />
            <Text style={{ fontWeight: 'bold' }}> 등급</Text>
          </>
        )}
      </View>
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
        onPress={onPress}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  calorieScoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginTop: 11,
    marginBottom: 0,
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
