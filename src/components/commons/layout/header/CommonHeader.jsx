import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default function CommonHeader({ leftText, rightText, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{leftText}</Text>

      {rightText ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptySpace} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: 'white',
  },
  leftText: {
    fontSize: 25,
    fontWeight: '600',
  },
  rightText: {
    fontSize: 18,
    color: 'grey',
  },
  emptySpace: {
    width: 50,
  },
});
