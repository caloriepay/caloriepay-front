import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function SignUpHeader(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="chevron-left" onPress={navigation.goBack} size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: hp(2),
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 21,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    padding: 16,
  },
});
