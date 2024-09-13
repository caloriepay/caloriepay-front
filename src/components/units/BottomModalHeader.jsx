import { View, Text, StyleSheet } from 'react-native';
import { ChevronUpIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import { globalStyles } from '../../styles/globalStyles';

export const BottomModalHeader = (isModalOpen) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Daily Report{' '}
      {isModalOpen ? (
        <ChevronDownIcon color={'white'} />
      ) : (
        <ChevronUpIcon color={'white'} />
      )}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: globalStyles.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
