import { ButtonGroup } from '@rneui/themed';
import { Text, StyleSheet, View } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

export default function CustomButtonGroup({
  buttons,
  containerStyle,
  buttonStyle,
  selectedIndex,
  setSelectedIndex,
  isLabel,
  labelText,
  selectedButtonStyle,
}) {
  return (
    <View>
      {isLabel ? <Text style={styles.labelText}>{labelText}</Text> : <></>}
      <ButtonGroup
        buttons={[...buttons]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ ...styles.containerStyle, ...containerStyle }}
        buttonStyle={{ ...styles.buttonStyle, ...buttonStyle }}
        selectedButtonStyle={{
          ...styles.selectedButtonStyle,
          ...selectedButtonStyle,
        }}
        innerBorderStyle={styles.innerBorderStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 50,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  buttonStyle: {
    marginHorizontal: 10,
    backgroundColor: globalStyles.gray,
    borderRadius: 10,
  },
  selectedButtonStyle: {
    backgroundColor: globalStyles.mainColor,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
    marginBottom: 10,
  },
  innerBorderStyle: {
    width: 0,
  },
});
