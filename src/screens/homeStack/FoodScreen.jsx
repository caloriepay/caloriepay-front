import { View, Image, StyleSheet, Text } from 'react-native';
import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import MainContainer from '../../components/commons/layout/container/MainContainer';
import { calculateTotalFoodKcal } from '../../utils/totalKcal';
import CustomButton from '../../components/commons/buttons/CustomButton';
import CommonHeader from '../../components/commons/layout/header/CommonHeader';
import { useMoveToScreen } from '../../components/commons/hooks/useMoveToScreen';

export default function FoodScreen({ route }) {
  const { onPressGoBack } = useMoveToScreen();
  const { response, photoUri } = route.params;
  const formatTo12Hour = (hour, minute) => {
    const period = hour >= 12 ? '오후' : '오전';
    const adjustedHour = hour % 12 || 12;
    return `${period} ${adjustedHour}시 ${minute}분`;
  };

  const formattedTime = formatTo12Hour(
    response.mealTime[3],
    response.mealTime[4],
  );
  console.log(response);
  const totalCalories = calculateTotalFoodKcal(response.foods);
  return (
    <MainWrapper>
      <MainContainer>
        <CommonHeader leftText={formattedTime} />
        <Image
          source={{ uri: photoUri }}
          style={[styles.photo, { resizeMode: 'cover' }]}
        />
        {response.foods !== undefined ? (
          response.foods.map((item, index) => (
            <View key={`foods-${index}`}>
              <View style={styles.itemWrapper}>
                <Text style={styles.itemTitle}>{item.foodName}</Text>
                <Text style={styles.itemKcal}>{item.calorie}kcal</Text>
              </View>
            </View>
          ))
        ) : (
          <View>?</View>
        )}
        <View
          style={{
            ...styles.itemWrapper,
            borderTopWidth: 2,
            borderTopColor: '#A5A5A5',
            paddingTop: 20,
          }}
        >
          <Text style={styles.itemTitle}>총합</Text>
          <Text style={styles.totalKcal}>{totalCalories} kcal</Text>
        </View>
      </MainContainer>
      <MainContainer>
        <CommonHeader leftText="영양 상세 정보" />
        {response.foods !== undefined ? (
          response.foods.map((item, index) => (
            <View key={`foods-${index}`}>
              <View style={styles.itemWrapper}>
                <Text style={styles.foodTitle}>{item.foodName}</Text>
                <Text style={styles.itemKcal}>{item.calorie}kcal</Text>
              </View>
              <View style={styles.nutrientWrapper}>
                <View style={styles.itemWrapper}>
                  <Text style={styles.nutrientTitle}>탄수화물</Text>
                  <Text style={styles.nutrientAmount}>
                    {item.carbohydrate} g
                  </Text>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={styles.nutrientTitle}>단백질</Text>
                  <Text style={styles.nutrientAmount}>{item.protein} g</Text>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={styles.nutrientTitle}>지방</Text>
                  <Text style={styles.nutrientAmount}>{item.fat} g</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View>?</View>
        )}
      </MainContainer>
      <CustomButton
        title="등록하기"
        onPress={() => {
          onPressGoBack();
        }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  photo: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  itemTitle: {
    color: '#676767',
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemKcal: {
    color: '#878787',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalKcal: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  foodTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nutrientWrapper: {
    borderBottomWidth: 1,
  },
  nutrientTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  nutrientAmount: {
    color: '#148CFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
