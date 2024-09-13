import * as yup from 'yup';

export const userPersonalSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요.'),
  phoneNumber: yup
    .string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '휴대폰 입력 형식에 맞지 않습니다.')
    .required('휴대폰은 필수 입력입니다.'),
  email: yup
    .string()
    .email('이메일 형식에 적합하지 않습니다.')
    .required('이메일은 필수 입력입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자리 이상으로 입력해주세요.')
    .max(20, '비밀번호는 최대 20자리로 입력해주세요.')
    .required('비밀번호는 필수 입력입니다.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
});

export const userPhysicalSchema = yup.object({
  age: yup
    .string()
    .matches(/^\d+$/, '나이는 숫자만 입력할 수 있습니다.')
    .required('나이를 입력해주세요.'),
  height: yup
    .string()
    .matches(/^\d+$/, '키는 숫자만 입력할 수 있습니다.')
    .required('키를 입력해주세요.'),
  weight: yup
    .string()
    .matches(/^\d+$/, '몸무게는 숫자만 입력할 수 있습니다.')
    .required('몸무게를 입력해주세요.'),
});

export const userGoalSchema = yup.object({
  targetWeight: yup
    .string()
    .matches(/^\d+$/, '몸무게는 숫자만 입력할 수 있습니다.')
    .required('목표 체중을 입력해주세요.'),
});
