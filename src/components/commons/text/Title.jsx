import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

SplashScreen.preventAutoHideAsync();

export default function Title() {
  const [fontsLoaded] = useFonts({
    'Kanit-Bold': require('../../../assets/fonts/Kanit-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>Calorie Pay</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Kanit-Bold',
    fontSize: wp(6),
  },
});
