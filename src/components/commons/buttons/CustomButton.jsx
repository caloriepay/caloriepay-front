import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import { Button } from '@rneui/base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function CustomButton({
  title,
  icon,
  iconContainerStyle,
  iconPosition,
  titleStyle,
  buttonStyle,
  containerStyle,
  onPress,
  width = '100%',
}) {
  return (
    <Button
      title={title}
      icon={icon}
      iconContainerStyle={styles.iconContainerStyle}
      iconPosition={iconPosition}
      titleStyle={{ ...styles.titleStyle, ...titleStyle }}
      buttonStyle={{
        ...styles.buttonStyle,
        width: width || styles.buttonStyle.width,
        ...buttonStyle,
      }}
      containerStyle={{
        ...styles.containerStyle,
        ...containerStyle,
      }}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: globalStyles.mainColor,
    borderRadius: 10,
    height: wp(11),
  },
  containerStyle: {
    width: wp(100),
    paddingHorizontal: wp(3),
    marginBottom: wp(3),
  },
  iconContainerStyle: {
    marginRight: 12,
  },
});
