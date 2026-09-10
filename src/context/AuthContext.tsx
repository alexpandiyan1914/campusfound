import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import storage from "../utils/storage";

import {
    registerLogout,
} from "../utils/authManager";

import {
    getUserRoleFromToken,
} from "../utils/jwt";

import pushNotificationService
    from "../services/pushNotificationService";

import notificationService
    from "../services/notificationService";

type UserRole =
    | "STUDENT"
    | "ADMIN";

interface AuthContextType {
    token: string | null;
    role: UserRole | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (
        token: string
    ) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext =
    createContext<
        AuthContextType | undefined
    >(undefined);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: Props) => {
    const [
        token,
        setToken,
    ] =
        useState<string | null>(
            null
        );

    const [
        role,
        setRole,
    ] =
        useState<UserRole | null>(
            null
        );

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    const clearLocalSession =
        async () => {
            await storage.removeToken();
            await storage.removePushToken();

            setToken(null);
            setRole(null);
        };

    const registerCurrentDeviceForNotifications =
        async () => {
            try {
                const pushToken =
                    await pushNotificationService
                        .getExpoPushToken();

                if (!pushToken) {
                    return;
                }

                const platform =
                    pushNotificationService
                        .getPlatform();

                const deviceName =
                    pushNotificationService
                        .getDeviceName();

                await notificationService
                    .registerDevice({
                        pushToken,
                        platform,
                        deviceName,
                    });

                await storage
                    .savePushToken(
                        pushToken
                    );

                console.log(
                    "Push device registered successfully."
                );
            } catch (error) {
                console.log(
                    "Push device registration failed:",
                    error
                );
            }
        };

    const loadToken =
        async () => {
            try {
                const savedToken =
                    await storage
                        .getToken();

                if (!savedToken) {
                    return;
                }

                setToken(
                    savedToken
                );

                const userRole =
                    getUserRoleFromToken(
                        savedToken
                    );

                setRole(
                    userRole
                );

                void registerCurrentDeviceForNotifications();
            } catch (error) {
                console.log(
                    "Auth loading error:",
                    error
                );
            } finally {
                setLoading(
                    false
                );
            }
        };

    const login =
        async (
            jwt: string
        ) => {
            await storage
                .saveToken(jwt);

            setToken(jwt);

            const userRole =
                getUserRoleFromToken(
                    jwt
                );

            setRole(
                userRole
            );

            console.log(
                "Logged in role:",
                userRole
            );

            void registerCurrentDeviceForNotifications();
        };

    const logout =
        async () => {
            try {
                const pushToken =
                    await storage
                        .getPushToken();

                if (pushToken) {
                    await notificationService
                        .unregisterDevice(
                            pushToken
                        );

                    console.log(
                        "Push device unregistered successfully."
                    );
                }
            } catch (error) {
                console.log(
                    "Push device unregister failed:",
                    error
                );
            } finally {
                await clearLocalSession();

                console.log(
                    "User logged out successfully."
                );
            }
        };

    const forceLocalLogout =
        async () => {
            try {
                await clearLocalSession();

                console.log(
                    "Session cleared after authentication failure."
                );
            } catch (error) {
                console.log(
                    "Forced logout cleanup failed:",
                    error
                );
            }
        };

    useEffect(() => {
        loadToken();
    }, []);

    useEffect(() => {
        registerLogout(
            forceLocalLogout
        );
    }, []);


    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                loading,
                isAuthenticated:
                    !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;