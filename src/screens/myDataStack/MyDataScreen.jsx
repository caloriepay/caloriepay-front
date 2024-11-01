import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Graph from '../../components/commons/graph/Graph';
import { getUserInfo, getUserWeightRecords } from '../../api/userApi';
import CommonHeader from '../../components/commons/layout/header/CommonHeader';
import { globalStyles } from '../../styles/globalStyles';
import { useFocusEffect } from '@react-navigation/native';

export default function MyDataScreen() {
  const [data, setData] = useState();
  const [username, setUsername] = useState();
  const [goal, setGoal] = useState();
  const [weight, setWeight] = useState();
  const [targetWeight, setTargetWeight] = useState();

  const fetchScoreData = async () => {
    const userInfo = await getUserInfo();
    const weightRecords = await getUserWeightRecords();
    setData(weightRecords);
    setUsername(userInfo?.name);
    setWeight(userInfo?.profile?.weight);
    setTargetWeight(userInfo?.profile?.targetWeight);
    setGoal(userInfo?.profile?.goal);
  };
  useEffect(() => {
    fetchScoreData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchScoreData();
    }, []),
  );
  return (
    <MainWrapper>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNames}>{username} 님</Text>
      </View>

      <MainContainer containerStyle={{ marginBottom: 5 }}>
        <View style={styles.goalContainer}>
          <Text style={styles.leftText}>나의 목표</Text>
          <Text style={styles.rightText}>
            {goal === 'DIET' ? '다이어트' : '유지어트'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>수정</Text>
          </TouchableOpacity>
        </View>
      </MainContainer>

      <MainContainer containerStyle={{ marginBottom: 5 }}>
        <View>
          <View style={styles.goalContainer}>
            <Text style={styles.leftText}>현재 체중</Text>
            <Text style={styles.targetWeight}>목표 체중</Text>
            <TouchableOpacity>
              <Text style={styles.editButton}>수정</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.weightContainer}>
            <View style={styles.weightColumn}>
              <Text style={styles.weightValue}>{weight}kg</Text>
            </View>
            <View style={styles.weightColumn}>
              <Text style={styles.weightValue}>{targetWeight}kg</Text>
            </View>
            <View style={styles.spacer} />
          </View>
        </View>
      </MainContainer>
      <MainContainer>
        <CommonHeader leftText="체중 변화" />
        {data ? (
          <Graph data={data} />
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </MainContainer>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  userNameContainer: {
    backgroundColor: globalStyles.mainColor,
    paddingVertical: hp(2),
    paddingHorizontal: wp(7),
    borderRadius: 20,
    alignItems: 'flex-start',
    marginVertical: hp(1),
    marginHorizontal: wp(5),
    marginBottom: 0,
  },
  userNames: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
    marginHorizontal: wp(2),
    shadowOpacity: 0,
  },
  leftText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  rightText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  targetWeight: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  editButton: {
    color: 'grey',
    fontSize: 15,
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginVertical: hp(3),
    marginHorizontal: wp(1),
    shadowOpacity: 0,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginHorizontal: wp(2),
    opacity: 1,
  },
  weightValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  weightColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginRight: wp(4),
  },
  spacer: {
    flex: 0.3,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 330,
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: globalStyles.gray,
  },
});
