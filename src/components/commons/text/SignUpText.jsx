import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

export default function SignUpText({ navigation }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.subLoginText}>아직 회원이 아니신가요?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('signUpPersonInfo');
        }}
      >
        <Text style={styles.loginText}>회원가입</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subLoginText: {
    color: globalStyles.subLoginTextColor,
    marginTop: 16,
  },
  loginText: {
    fontWeight: '800',
    fontSize: 14,
    marginTop: 4,
    color: globalStyles.loginTextColor,
  },
});
