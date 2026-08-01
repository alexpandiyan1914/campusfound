import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/home/HomeScreen";
import useAuth from "../hooks/useAuth";
import BottomTabs from "./BottomTabs";
import AuthNavigator from "./AuthNavigator";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated, loading, } = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated ? (
    <BottomTabs />
  ) : (
    <AuthNavigator />
  );
};

export default AppNavigator;