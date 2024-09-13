import { View } from 'react-native';
import SignUpWrapper from '../../components/commons/layout/wrapper/SignupWrapper';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import InputField from '../../components/commons/input/InputField';
import SignUpText from '../../components/commons/text/SignUpText';
import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <SignUpWrapper
      title="로그인"
      buttonText="로그인"
      onPress={() => console.log('login')}
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
