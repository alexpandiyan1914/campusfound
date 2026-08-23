import useAuth from "../hooks/useAuth";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import AdminNavigator from "./AdminNavigator";

const AppNavigator = () => {

    const {
        isAuthenticated,
        loading,
        role,
    } = useAuth();


    if (loading) {

        return null;

    }


    if (!isAuthenticated) {

        return <AuthNavigator />;

    }


    if (role === "ADMIN") {

        return <AdminNavigator />;

    }


    return <MainNavigator />;

};

export default AppNavigator;