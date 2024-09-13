import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { userPersonalSchema } from '../../../components/commons/input/validation';
import InputField from '../../../components/commons/input/InputField';
import { handleFormErrors } from '../../../utils/error/formErrorHandlers';
import SignUpWrapper from '../../../components/commons/layout/wrapper/SignupWrapper';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
} from 'react-native-heroicons/outline';

export default function SignUpPersonInfoScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(userPersonalSchema),
    mode: 'onSubmit',
  });
  const onSubmit = async (data) => {
    const { email, name, phoneNumber } = data;
    const validationData = { email, name, phoneNumber };
    const { confirmPassword, ...personalData } = data;
    console.log(data);
    console.log(validationData);
    // checkUser api 호출
    // src/utils/handleApiErrors.js 로 에러 핸들링
    // useForm의 setError 메서드를 props로 보내서 백엔드 에러메시지 핸들링

    navigation.navigate('signUpPhysicalInfo', {
      personalData,
    });
  };
  console.log('===========');
  console.log(errors);

  return (
    <SignUpWrapper
      title="회원가입"
      buttonText="다음"
      onPress={handleSubmit(onSubmit)}
    >
      <InputField
        control={control}
        name="name"
        title="이름"
        placeholder="이름을 입력해주세요"
        errors={errors}
        leftIcon={<UserIcon color="gray" />}
      />
      <InputField
        control={control}
        name="phoneNumber"
        title="휴대폰"
        placeholder="휴대폰번호를 -없이 입력해주세요"
        errors={errors}
        leftIcon={<DevicePhoneMobileIcon color="gray" />}
      />
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
        placeholder="비밀번호을 입력해주세요"
        secureTextEntry={true}
        errors={errors}
        leftIcon={<LockClosedIcon color="gray" />}
      />
      <InputField
        control={control}
        name="confirmPassword"
        title="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요"
        secureTextEntry={true}
        errors={errors}
        leftIcon={<LockClosedIcon color="gray" />}
      />
    </SignUpWrapper>
  );
}
