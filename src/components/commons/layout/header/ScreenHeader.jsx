import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useMoveToScreen } from '../../hooks/useMoveToScreen';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
export default function ScreenHeader({ title }) {
  const { onPressGoBack } = useMoveToScreen();
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: 'white',
          }}
        >
          <TouchableOpacity
            onPress={onPressGoBack}
            style={{
              position: 'absolute',
              left: 20,
              padding: 10,
            }}
          >
            <ChevronLeftIcon style={{ color: 'black' }}></ChevronLeftIcon>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
