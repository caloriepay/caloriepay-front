import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import CustomButtonGroup from '../../components/commons/buttons/CustomButtonGroup';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MainContainer from '../../components/commons/layout/container/MainContainer';
export default function SocialScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <MainWrapper>
      <View style={styles.buttonContainer}>
        <CustomButtonGroup
          buttons={['전체 랭킹', '친구 랭킹']}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          containerStyle={styles.buttonGroupContainer}
          isLabel={true}
        />
      </View>
      <MainContainer>
        <View>
          <Text style={styles.userName}>정채원님</Text>
          <View style={styles.row}>
            <Text style={styles.font}>전체순위</Text>
            <Text style={styles.font}>친구순위</Text>
            <Text style={styles.font}>티어</Text>
            <Text style={styles.font}>Calorie Score</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.datarow}>
            <Text>5</Text>
            <Text>1</Text>
            <Text>티어</Text>
            <Text>868점</Text>
          </View>
        </View>
      </MainContainer>
      <View>
        {selectedIndex === 0 ? (
          <Text>전체 랭킹 내용</Text>
        ) : (
          <Text>친구 랭킹 내용</Text>
        )}
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonGroupContainer: {
    backgroundColor: globalStyles.backgroundColor,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginHorizontal: wp(2),
    opacity: 1,
  },
  datarow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});
