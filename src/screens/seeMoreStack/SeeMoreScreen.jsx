import { Text, TouchableOpacity } from 'react-native';
import MainWrapper from '../../components/commons/layout/wrapper/MainWrapper';
import { useAuth } from '../../context/authContext';

export default function SeeMoreScreen() {
  const { logOut } = useAuth();
  return (
    <MainWrapper>
      <TouchableOpacity
        onPress={() => {
          logOut();
        }}
      >
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </MainWrapper>
  );
}
