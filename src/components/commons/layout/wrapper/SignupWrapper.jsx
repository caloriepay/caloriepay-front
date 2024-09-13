import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignUpHeader from '../header/SignUpHeader';
import CustomButton from '../../buttons/CustomButton';

export default function SignUpWrapper(props) {
  return (
    <GestureHandlerRootView style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ height: '100%' }}>
            <SignUpHeader title={props.title} />
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
              enableAutomaticScroll={true}
              showsVerticalScrollIndicator={false}
              extraHeight={100}
            >
              <View style={styles.container}>{props.children}</View>
            </KeyboardAwareScrollView>
            <CustomButton title={props.buttonText} onPress={props.onPress} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
});
