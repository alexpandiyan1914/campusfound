import useAuth from "../hooks/useAuth";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const AppNavigator = () => {

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) return null;

  return isAuthenticated ? (

    <MainNavigator />

  ) : (

    <AuthNavigator />

  );
};

export default AppNavigator;