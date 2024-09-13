import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import SignUpWrapper from '../../../components/commons/layout/wrapper/SignupWrapper';
import CustomButtonGroup from '../../../components/commons/buttons/CustomButtonGroup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/commons/input/InputField';
import { userGoalSchema } from '../../../components/commons/input/validation';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../../context/authContext';
import { joinUser } from '../../../api/userApi';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SignUpGoalInfoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [goal, setGoal] = useState(0);
  const [activityLevel, setActivityLevel] = useState(0);
  const { logIn } = useAuth();
  const { updatedData } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userGoalSchema),
    mode: 'onSubmit',
  });
  const onSubmit = () => {
    console.log(goal, activityLevel);
    const userData = { ...updatedData, goal, activityLevel };
    console.log(userData);
    // 회원가입 API 요청
    joinUser(userData);
    logIn();
  };
  return (
    <View style={{ height: '100%', paddingBottom: 30 }}>
      <SignUpWrapper
        title="사용자 개인 설정"
        buttonText="완료"
        onPress={handleSubmit(onSubmit)}
      >
        <View style={{ width: '100%' }}>
          <CustomButtonGroup
            buttons={['다이어트', '유지어트']}
            containerStyle={{ flexDirection: 'column', height: 140 }}
            buttonStyle={{
              marginVertical: 10,
              alignItems: 'flex-start',
              paddingLeft: 20,
            }}
            selectedIndex={goal}
            setSelectedIndex={setGoal}
            isLabel={true}
            labelText="목표"
          />
          <CustomButtonGroup
            buttons={[
              '많다(활동량 많음 혹은 주 6~7회 운동)',
              '보통 (활동량 준수 혹은 주 3~5회 운동)',
              '조금 있다 (활동량 보통 혹은 주 1~2회 운동',
              '거의 없다 (거의 좌식생활)',
            ]}
            containerStyle={{
              flexDirection: 'column',
              height: 300,
            }}
            buttonStyle={{
              marginVertical: 10,
              alignItems: 'flex-start',
              paddingLeft: 20,
            }}
            selectedIndex={activityLevel}
            setSelectedIndex={setActivityLevel}
            isLabel={true}
            labelText="활동량 수준"
          />
          <InputField
            control={control}
            name="targetWeight"
            title="목표 몸무게 (kg)"
            placeholder="목표 몸무게를 입력해주세요"
            errors={errors}
            leftIcon={<Icon name="outlined-flag" size={20} color="gray" />}
          />
          <Text>내 키의 정상 체중범위</Text>
        </View>
      </SignUpWrapper>
    </View>
  );
}
