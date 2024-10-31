import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyDataScreen() {
  return (
    <MainWrapper>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNames}>정채원님</Text>
      </View>

      <MainContainer>
        <View style={styles.goalContainer}>
          <Text style={styles.leftText}>나의 목표</Text>
          <Text style={styles.rightText}>다이어트</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>수정</Text>
          </TouchableOpacity>
        </View>
      </MainContainer>

      <MainContainer>
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
              <Text style={styles.weightValue}>63.0kg</Text>
            </View>
            <View style={styles.weightColumn}>
              <Text style={styles.weightValue}>61.5kg</Text>
            </View>
            <View style={styles.spacer} />
          </View>
        </View>
      </MainContainer>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  userNameContainer: {
    backgroundColor: '#18C07A',
    paddingVertical: hp(2),
    paddingHorizontal: wp(7),
    borderRadius: 20,
    alignItems: 'flex-start',
    marginVertical: hp(1),
    marginHorizontal: wp(5),
  },
  userNames: {
    fontSize: 28,
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
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  rightText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  targetWeight: {
    fontSize: 25,
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
    fontSize: 35,
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
});
