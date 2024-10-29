import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { getExerciseData } from '../../api/exerciseAPI';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

export default function CustomDropdown({ value, onChange }) {
  const [isFocus, setIsFocus] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getExerciseData();
      if (!response) {
        navigation.goBack();
        Alert.alert(
          '서버 불안정',
          '서버가 불안정하여 데이터를 로드할 수 없습니다.',
        );
      }
      const formattedList = response.data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setExerciseData(formattedList);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>운동 종류</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: globalStyles.mainColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={exerciseData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? '운동 종류를 선택하세요' : '...'}
        searchPlaceholder="운동 검색"
        value={value?.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
