import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { tierColors } from '../../../utils/tierColors';

SplashScreen.preventAutoHideAsync();

export default function CalorieTier({
  tier,
  containerStyle,
  isCount = false,
  count,
}) {
  const [fontsLoaded] = useFonts({
    'LuckiestGuy-Regular': require('../../../assets/fonts/LuckiestGuy-Regular.ttf'),
  });
  const [containerSize, setContainerSize] = useState({ width: 24, height: 32 });
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

  const onContainerLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const fontSize = Math.min(containerSize.width, containerSize.height) * 0.8;
  const borderRadius =
    Math.min(containerSize.width, containerSize.height) * 0.4;
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: tierColors[tier] || tierColors.None,
        borderRadius: borderRadius,
        ...containerStyle,
      }}
      onLayout={onContainerLayout}
    >
      {!isCount ? (
        <Text style={[styles.text, { fontSize }]}>{tier || '?'}</Text>
      ) : (
        <Text style={[styles.text, { fontSize }]}>{count || 0}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 32,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
  },
});
