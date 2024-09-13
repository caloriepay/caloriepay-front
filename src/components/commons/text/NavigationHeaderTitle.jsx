import { Text, StyleSheet } from 'react-native';

export default function NavigationHeaderTitle({ title }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
