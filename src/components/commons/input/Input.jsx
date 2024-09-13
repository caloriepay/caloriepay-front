import { Input } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

export default function CustomInput({
  title,
  placeholder,
  error,
  errorComponent,
  errorMessage,
  onChange,
  value,
  secureTextEntry,
  leftIcon,
}) {
  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        inputContainerStyle={styles.inputContainerStyle}
        label={title}
        labelStyle={styles.labelStyle}
        errorProps={error}
        ErrorComponent={errorComponent}
        errorMessage={errorMessage}
        onChangeText={onChange}
        value={value}
        secureTextEntry={secureTextEntry}
        leftIcon={leftIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    // borderRadius: 12,
    // backgroundColor: globalStyles.gray,
    // paddingHorizontal: 12,
    // paddingVertical: 8,
  },
  labelStyle: {
    marginBottom: 10,
    color: 'black',
  },
});
