import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { tierColors } from '../../../utils/tierColors';

SplashScreen.preventAutoHideAsync();

export default function CalorieTier({ tier, color, containerStyle }) {
  const [fontsLoaded] = useFonts({
    'LuckiestGuy-Regular': require('../../../assets/fonts/LuckiestGuy-Regular.ttf'),
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
    <View style={{ ...styles.container, ...containerStyle }}>
      <Text style={styles.text}>S</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    alignItems: 'center',
    width: 24,
    height: 32,
    borderRadius: 10,
    backgroundColor: tierColors.S,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
  },
});
