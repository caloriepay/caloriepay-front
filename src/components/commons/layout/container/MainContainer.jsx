import { StyleSheet, View } from 'react-native';

export default function MainContainer({
  backgroundColor = 'white',
  children,
  hasShadow = true,
  containerStyle,
}) {
  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: backgroundColor,
        ...(hasShadow ? styles.shadow : {}),
        ...containerStyle,
      }}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 12,
    margin: 16,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
