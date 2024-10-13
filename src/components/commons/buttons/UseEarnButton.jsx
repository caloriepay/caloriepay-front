import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainContainer from '../layout/container/MainContainer';
import { PlusSmallIcon, MinusSmallIcon } from 'react-native-heroicons/solid';
import { globalStyles } from '../../../styles/globalStyles';

export default function UseEarnButton({ color, text, icon, onPress }) {
  return (
    <MainContainer containerStyle={{ flex: 1 }}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonWrapper}>
          <View style={styles.emojiWrapper}>
            {icon ? (
              <PlusSmallIcon size={35} color={color} />
            ) : (
              <MinusSmallIcon size={35} color={color} />
            )}
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
  },
  emojiWrapper: {
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.gray,
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
