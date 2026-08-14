import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";
import userService from "../services/userService";
import { UserProfile } from "../types/user";

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;

  refreshProfile: () => Promise<void>;

  setProfile: React.Dispatch<
    React.SetStateAction<UserProfile | null>
  >;
}

const ProfileContext =
  createContext<ProfileContextType | undefined>(
    undefined
  );

interface Props {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: Props) => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    if (!isAuthenticated) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      console.log("ProfileContext: Fetching profile");

      const data =
        await userService.getCurrentUser();

      setProfile(data);

    } catch (error: any) {

      console.log(
        "ProfileContext Error:",
        error.response?.data || error.message
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (authLoading) {
      return;
    }

    loadProfile();

  }, [isAuthenticated, authLoading]);

  const refreshProfile = async () => {
    await loadProfile();
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        refreshProfile,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider"
    );
  }

  return context;
};

export default ProfileContext;