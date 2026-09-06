import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AppState,
  AppStateStatus,
} from "react-native";

import useAuth from "../hooks/useAuth";
import { useProfile } from "./ProfileContext";
import claimService from "../services/claimService";

import {
  Claim,
  CreateClaimRequest,
} from "../types/claim";

interface ClaimContextType {
  claims: Claim[];
  loading: boolean;
  refreshing: boolean;
  getClaimForItem: (
    itemId: number
  ) => Claim | undefined;
  createClaim: (
    request: CreateClaimRequest
  ) => Promise<Claim>;
  refreshClaims: () => Promise<void>;
  refreshClaimById: (
    claimId: number
  ) => Promise<Claim | undefined>;
}

const ClaimContext =
  createContext<ClaimContextType | undefined>(
    undefined
  );

interface Props {
  children: ReactNode;
}

export const ClaimProvider = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const { profile, loading: profileLoading } =
    useProfile();

  const [claims, setClaims] =
    useState<Claim[]>([]);
  const [loading, setLoading] =
    useState(false);
  const [refreshing, setRefreshing] =
    useState(false);

  const loadClaims = async (
    showInitialLoading = true
  ) => {
    if (
      !isAuthenticated ||
      profileLoading ||
      profile?.role !== "STUDENT"
    ) {
      setClaims([]);
      return;
    }

    try {
      if (showInitialLoading) {
        setLoading(true);
      }

      console.log(
        "ClaimContext: Fetching my claims"
      );

      const response =
        await claimService.getMyClaims(0, 50);

      setClaims(response.content);
    } catch (error: any) {
      console.log(
        "ClaimContext Error:",
        error.response?.data || error.message
      );
    } finally {
      if (showInitialLoading) {
        setLoading(false);
      }

      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (profileLoading) {
      return;
    }

    loadClaims();
  }, [
    isAuthenticated,
    profileLoading,
    profile?.role,
  ]);

  useEffect(() => {
    const subscription =
      AppState.addEventListener(
        "change",
        (nextState: AppStateStatus) => {
          if (
            nextState === "active" &&
            isAuthenticated &&
            profile?.role === "STUDENT"
          ) {
            loadClaims(false);
          }
        }
      );

    return () => {
      subscription.remove();
    };
  }, [
    isAuthenticated,
    profile?.role,
  ]);

  const refreshClaims = async () => {
    setRefreshing(true);
    await loadClaims(false);
  };

  const refreshClaimById = async (
    claimId: number
  ): Promise<Claim | undefined> => {
    if (
      !isAuthenticated ||
      profile?.role !== "STUDENT"
    ) {
      return undefined;
    }

    try {
      const latestClaim =
        await claimService.getClaimById(claimId);

      setClaims(prev => {
        const exists = prev.some(
          claim => claim.id === latestClaim.id
        );

        if (!exists) {
          return [latestClaim, ...prev];
        }

        return prev.map(claim =>
          claim.id === latestClaim.id
            ? latestClaim
            : claim
        );
      });

      return latestClaim;
    } catch (error: any) {
      console.log(
        "ClaimContext Claim Refresh Error:",
        error.response?.data || error.message
      );

      return undefined;
    }
  };

  const getClaimForItem = (
    itemId: number
  ) => {
    return claims.find(
      claim => claim.itemId === itemId
    );
  };

  const createClaim = async (
    request: CreateClaimRequest
  ): Promise<Claim> => {
    const newClaim =
      await claimService.createClaim(request);

    setClaims(prev => {
      const alreadyExists =
        prev.some(
          claim => claim.id === newClaim.id
        );

      if (alreadyExists) {
        return prev.map(claim =>
          claim.id === newClaim.id
            ? newClaim
            : claim
        );
      }

      return [newClaim, ...prev];
    });

    return newClaim;
  };

  return (
    <ClaimContext.Provider
      value={{
        claims,
        loading,
        refreshing,
        getClaimForItem,
        createClaim,
        refreshClaims,
        refreshClaimById,
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
};

export const useClaims = () => {
  const context =
    useContext(ClaimContext);

  if (!context) {
    throw new Error(
      "useClaims must be used inside ClaimProvider"
    );
  }

  return context;
};

export default ClaimContext;
