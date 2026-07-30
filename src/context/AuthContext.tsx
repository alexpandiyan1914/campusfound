import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import storage from "../utils/storage";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {

    try {

      const savedToken = await storage.getToken();

      if (savedToken) {
        setToken(savedToken);
      }

    } finally {

      setLoading(false);

    }

  };

  const login = async (jwt: string) => {

    await storage.saveToken(jwt);

    setToken(jwt);

  };

  const logout = async () => {

    await storage.removeToken();

    setToken(null);

  };

  return (

    <AuthContext.Provider

      value={{

        token,

        loading,

        isAuthenticated: !!token,

        login,

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthContext;