import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { userPhysicalSchema } from '../../../components/commons/input/validation';
import { View } from 'react-native';
import CustomButton from '../../../components/commons/buttons/CustomButton';
import InputField from '../../../components/commons/input/InputField';
import { checkUser } from '../../../api/userApi';
import { handleFormErrors } from '../../../utils/error/formErrorHandlers';
import SignUpWrapper from '../../../components/commons/layout/wrapper/SignupWrapper';
import CustomButtonGroup from '../../../components/commons/buttons/CustomButtonGroup';
import { useState } from 'react';
import { ScaleIcon } from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SignUpPhysicalInfoScreen(props) {
  console.log('render');
  const navigation = useNavigation();
  const route = useRoute();
  const { personalData } = route.params;

  const [selectedGender, setSelectedGender] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(userPhysicalSchema),
    mode: 'onSubmit',
  });
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      gender: selectedGender === 0 ? 'male' : 'female',
      ...personalData,
    };
    console.log('updateData');
    console.log(updatedData);
    navigation.navigate('signUpGoalInfo', { updatedData });
  };
  console.log('===========');
  console.log(errors);

  return (
    <SignUpWrapper
      title="사용자정보 등록"
      buttonText="다음"
      onPress={handleSubmit(onSubmit)}
    >
      <View style={{ width: '100%' }}>
        <InputField
          control={control}
          name="age"
          title="나이"
          placeholder="나이를 입력해주세요"
          errors={errors}
          leftIcon={<Icon name="history" size={20} color="gray" />}
        />
        <InputField
          control={control}
          name="height"
          title="키 (cm)"
          placeholder="키를 입력해주세요"
          errors={errors}
          // leftIcon={<Icon name="scale-balanced" />}
          leftIcon={<Icon name="straighten" size={20} color="gray" />}
        />
        <InputField
          control={control}
          name="weight"
          title="몸무게 (kg)"
          placeholder="몸무게를 입력해주세요"
          errors={errors}
          leftIcon={<Icon name="scale" size={20} color="gray" />}
          // leftIcon={<Icon name="monitor-weight" size={20} />}
        />
        <CustomButtonGroup
          buttons={['남자', '여자']}
          selectedIndex={selectedGender}
          setSelectedIndex={setSelectedGender}
          isLabel={true}
          labelText="성별"
        />
      </View>

      {/* <CustomButton title="다음" onPress={handleSubmit(onSubmit)} /> */}
    </SignUpWrapper>
  );
}
