import CustomButton from '../../components/commons/buttons/CustomButton';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Title from '../../components/commons/text/Title';
import { globalStyles } from '../../styles/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/authContext';
import SignUpText from '../../components/commons/text/SignUpText';

export default function InitialScreen() {
  const navigation = useNavigation();
  const { logIn } = useAuth();
  const handleKaKaoLogin = () => logIn();
  const handleEmailLogin = () => navigation.navigate('login');

  return (
    <View
      style={{
        height: hp(100),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="카카오 로그인"
          titleStyle={styles.kakaoText}
          icon={{
            name: 'comment',
            type: 'font-awesome',
            size: 21,
            color: globalStyles.kakaoIconColor,
          }}
          buttonStyle={{
            backgroundColor: globalStyles.kakaoContainerColor,
          }}
          onPress={handleKaKaoLogin}
          containerStyle={{ width: wp(90) }}
        />
        <CustomButton
          title="이메일 로그인"
          icon={{
            name: 'envelope',
            type: 'font-awesome',
            size: wp(4),
            color: 'white',
          }}
          onPress={handleEmailLogin}
          containerStyle={{ width: wp(90) }}
        />
        <SignUpText navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 1.3,
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
  kakaoText: {
    color: 'black',
  },
});
