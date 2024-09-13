import { StyleSheet, View, Text } from 'react-native';

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Text>{props.title}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    zIndex: 1000,
  },
});
