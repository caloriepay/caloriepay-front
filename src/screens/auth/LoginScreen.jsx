import { View } from 'react-native';
import SignUpWrapper from '../../components/commons/layout/wrapper/SignupWrapper';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import InputField from '../../components/commons/input/InputField';
import SignUpText from '../../components/commons/text/SignUpText';
import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { loginUser } from '../../api/userApi';
import { useAuth } from '../../context/authContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { logIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    const isLoginSuccessful = await loginUser(data);
    if (isLoginSuccessful) {
      logIn();
    }
  };
  return (
    <SignUpWrapper
      title="로그인"
      buttonText="로그인"
      onPress={handleSubmit(onSubmit)}
    >
      <View style={{ width: '100%', marginTop: 30 }}>
        <InputField
          control={control}
          name="email"
          title="사용자 계정(이메일)"
          placeholder="이메일을 입력해주세요"
          errors={errors}
          leftIcon={<EnvelopeIcon color="gray" />}
        />
        <InputField
          control={control}
          name="password"
          title="비밀번호"
          secureTextEntry={true}
          placeholder="비밀번호를 입력해주세요"
          errors={errors}
          leftIcon={<LockClosedIcon color="gray" />}
        />
      </View>
      <View>
        <SignUpText navigation={navigation} />
      </View>
    </SignUpWrapper>
  );
}
