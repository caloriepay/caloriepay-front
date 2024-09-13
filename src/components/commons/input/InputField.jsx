import { Controller } from 'react-hook-form';
import CustomInput from './Input';

export default function InputField({
  control,
  name,
  title,
  placeholder,
  secureTextEntry = false,
  errors,
  leftIcon,
}) {
  return (
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <CustomInput
          leftIcon={leftIcon}
          title={title}
          placeholder={placeholder}
          errorMessage={errors[name]?.message}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
        />
      )}
      name={name}
    />
  );
}
