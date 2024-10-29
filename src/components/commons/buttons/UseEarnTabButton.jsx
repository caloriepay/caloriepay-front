import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UseEarnTabButton({ title, isActive, onPress }) {
  return (
    <>
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.activeButton]}
        onPress={onPress}
      >
        <Text style={styles.tabText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    paddingVertical: 15,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#677086',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
