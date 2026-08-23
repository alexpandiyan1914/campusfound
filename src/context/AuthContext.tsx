import React, {
    createContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import storage from "../utils/storage";
import { registerLogout } from "../utils/authManager";
import { getUserRoleFromToken } from "../utils/jwt";

type UserRole = "STUDENT" | "ADMIN";

interface AuthContextType {

    token: string | null;

    role: UserRole | null;

    isAuthenticated: boolean;

    loading: boolean;

    login: (token: string) => Promise<void>;

    logout: () => Promise<void>;

}

const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: Props) => {

    const [token, setToken] =
        useState<string | null>(null);

    const [role, setRole] =
        useState<UserRole | null>(null);

    const [loading, setLoading] =
        useState(true);


    // --------------------------------
    // LOAD TOKEN
    // --------------------------------

    useEffect(() => {

        loadToken();

    }, []);


    const loadToken = async () => {

        try {

            const savedToken =
                await storage.getToken();

            if (savedToken) {

                setToken(savedToken);

                const userRole =
                    getUserRoleFromToken(
                        savedToken
                    );

                setRole(userRole);

            }

        } catch (error) {

            console.log(
                "Auth loading error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // --------------------------------
    // LOGIN
    // --------------------------------

    const login = async (
        jwt: string
    ) => {

        await storage.saveToken(jwt);

        setToken(jwt);

        const userRole =
            getUserRoleFromToken(jwt);

        setRole(userRole);

        console.log(
            "Logged in role:",
            userRole
        );

    };


    // --------------------------------
    // LOGOUT
    // --------------------------------

    const logout = async () => {

        await storage.removeToken();

        setToken(null);

        setRole(null);

    };


    // --------------------------------
    // REGISTER GLOBAL LOGOUT
    // --------------------------------

    useEffect(() => {

        registerLogout(logout);

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