import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import CustomDropdown from '../../components/units/Dropdown';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import CustomInput from '../../components/commons/input/Input';
import CustomButton from '../../components/commons/buttons/CustomButton';
import { earnKcalByExercise } from '../../api/exerciseAPI';
import { globalStyles } from '../../styles/globalStyles';
import { PlusCircleIcon, MinusCircleIcon } from 'react-native-heroicons/solid';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function ExerciseScreen() {
  const navigation = useNavigation();
  const [exerciseList, setExerciseList] = useState([
    { title: '', time: '', selectedItem: null },
  ]);

  const handleAddExercise = () => {
    setExerciseList([
      ...exerciseList,
      { title: '', time: '', selectedItem: null },
    ]);
  };
  const handleRemoveExercise = () => {
    if (exerciseList?.length > 1) {
      setExerciseList(exerciseList.slice(0, -1));
    }
  };
  const updateExerciseData = (index, key, value) => {
    setExerciseList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = {
        ...updatedList[index],
        [key]: value,
      };
      return updatedList;
    });
  };
  const handleSubmit = async () => {
    if (await earnKcalByExercise(exerciseList)) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeTab' }],
        }),
      );
    }
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return (
    <MainWrapper>
      <MainContainer>
        <View style={styles.headerWrapper}>
          <Text
            style={styles.headerText}
          >{`${year}년 ${month}월 ${day}일`}</Text>
        </View>
        <CustomInput
          title="운동 제목"
          placeholder="운동 제목을 입력해 주세요."
          onChange={(text) => updateExerciseData(0, 'title', text)}
        />
        {exerciseList.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <CustomDropdown
              value={exercise.selectedItem}
              onChange={(item) =>
                updateExerciseData(index, 'selectedItem', item)
              }
            />
            <CustomInput
              title="운동 시간"
              placeholder="분"
              keyboardType="numeric"
              value={exercise.time}
              onChange={(text) => updateExerciseData(index, 'time', text)}
            />
          </View>
        ))}
        <View style={styles.circleButtonWrapper}>
          <Text style={styles.circleButtonTitle}>운동 추가하기</Text>
          <TouchableOpacity onPress={handleAddExercise}>
            <PlusCircleIcon color={globalStyles.mainColor} size={45} />
          </TouchableOpacity>
        </View>
        <View style={styles.circleButtonWrapper}>
          <Text style={styles.circleButtonTitle}>운동 삭제하기</Text>
          <TouchableOpacity onPress={handleRemoveExercise}>
            <MinusCircleIcon color="red" size={45} />
          </TouchableOpacity>
        </View>

        <CustomButton
          title="등록하기"
          onPress={handleSubmit}
          containerStyle={{ width: '100%' }}
        />
      </MainContainer>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  circleButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#A5A5A5',
  },
  circleButtonTitle: {
    color: '#878787',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
