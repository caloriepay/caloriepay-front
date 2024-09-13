import { setError } from 'react-hook-form';

export function handleFormErrors(error, setError) {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 400) {
      switch (data.code) {
        case 701:
          setError('email', {
            type: 'manual',
            message: data.message || '이미 존재하는 이메일입니다.',
          });
          break;
        case 702:
          setError('name', {
            type: 'manual',
            message: data.message || '이미 존재하는 닉네임입니다.',
          });
          break;
        case 703:
          setError('phoneNumber', {
            type: 'manual',
            message: data.message || '이미 존재하는 전화번호입니다.',
          });
          break;
        default:
          console.log(`common error: ${error}`);
      }
    } else {
      console.log(`other error: ${error}`);
    }
  } else {
    console.log(`network error: ${error}`);
  }

  console.error('API Error:', error.message);
}
