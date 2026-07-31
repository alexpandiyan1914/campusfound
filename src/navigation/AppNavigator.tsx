import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/auth/HomeScreen";
import useAuth from "../hooks/useAuth";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {isAuthenticated, loading,} = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;