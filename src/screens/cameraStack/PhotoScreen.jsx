import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import BackButton from '../../components/commons/buttons/BackButton';
import { useMoveToScreen } from '../../components/commons/hooks/useMoveToScreen';
import { useLoading } from '../../context/loadingContext';
import { getObjectRecognitionResult } from '../../api/foodAPI';
import CustomButton from '../../components/commons/buttons/CustomButton';
import { globalStyles } from '../../styles/globalStyles';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function PhotoScreen({ route, navigation }) {
  const { photoUri } = route.params;
  const { onPressMoveToPage } = useMoveToScreen();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' },
      });
      unsubscribe();
    };
  }, [navigation]);
  const fetchData = async () => {
    showLoading();
    try {
      const response = await getObjectRecognitionResult(photoUri);
      onPressMoveToPage('Food', { response, photoUri });
    } catch (error) {
      Alert.alert(
        '오류 발생',
        '사진 인식 중 문제가 발생했습니다. 다시 시도해주세요.',
        [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false },
      );
    } finally {
      hideLoading();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: 'flex-start', margin: 10 }}>
        <BackButton color="black" />
      </View>
      <Image source={{ uri: photoUri }} style={styles.photo} />
      <View style={styles.buttonWrapper}>
        <CustomButton title="사용하기" onPress={fetchData} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  photo: {
    width: '100%',
    height: heightPercentageToDP(80),
  },
  buttonWrapper: {
    paddingTop: 10,
    height: heightPercentageToDP(20),
    backgroundColor: globalStyles.mainColor,
  },
});
