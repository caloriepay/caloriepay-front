import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  EllipsisHorizontalIcon,
} from 'react-native-heroicons/outline';
import { globalStyles } from '../styles/globalStyles';
import HomeScreen from '../screens/homeStack/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import InitialScreen from '../screens/auth/InitailScreen';
import SignUpPersonInfoScreen from '../screens/auth/signup/SignUpPersonalInfoScreen';
import SignUpPhysicalInfoScreen from '../screens/auth/signup/SignUpPhysicalInfoScreen';
import SignUpGoalInfoScreen from '../screens/auth/signup/SignUpGoalInfoScreen';
import SocialScreen from '../screens/socialStack/SocialScreen';
import MyDataScreen from '../screens/myDataStack/MyDataScreen';
import SeeMoreScreen from '../screens/seeMoreStack/SeeMoreScreen';
import { AuthProvider, useAuth } from '../context/authContext';
import Title from '../components/commons/text/Title';
import NavigationHeaderTitle from '../components/commons/text/NavigationHeaderTitle';
import { LoadingProvider } from '../context/loadingContext';
import CalendarScreen from '../screens/homeStack/CalendarScreen';
import CameraScreen from '../screens/cameraStack/CameraScren';
import PhotoScreen from '../screens/cameraStack/PhotoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Title />,
        }}
      />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

const SocialStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Social"
        component={SocialScreen}
        options={{
          headerTitle: () => <NavigationHeaderTitle title={'소셜'} />,
        }}
      />
    </Stack.Navigator>
  );
};

const MyDataStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyData"
        component={MyDataScreen}
        options={{
          headerTitle: () => <NavigationHeaderTitle title={'마이 데이터'} />,
        }}
      />
    </Stack.Navigator>
  );
};

const SeeMoreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SeeMore"
        component={SeeMoreScreen}
        options={{
          headerTitle: () => <NavigationHeaderTitle title={'더보기'} />,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: globalStyles.mainColor,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SocialTab"
        component={SocialStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChartBarIcon name="chartBar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDataTab"
        component={MyDataStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserIcon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SeeMoreTab"
        component={SeeMoreStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <EllipsisHorizontalIcon name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="initial" component={InitialScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="signUpPersonInfo"
        component={SignUpPersonInfoScreen}
      />
      <Stack.Screen
        name="signUpPhysicalInfo"
        component={SignUpPhysicalInfoScreen}
      />
      <Stack.Screen name="signUpGoalInfo" component={SignUpGoalInfoScreen} />
    </Stack.Navigator>
  );
};

const CameraStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
  )
}

const MainNavigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </>
  );
};

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="main" component={MainNavigation} />
      <Stack.Screen name="Cam" component={CameraStackNavigator} />
    </Stack.Navigator>
  )
}

export default function AppContainer() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <NavigationContainer>
        {/* <MainNavigation /> */}
        <RootNavigation/>
      </NavigationContainer>
      </AuthProvider>
    </LoadingProvider>
  );
}
