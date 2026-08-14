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

      /*
       * We intentionally load a larger page here.
       *
       * CampusFound V1 doesn't expect a student
       * to have hundreds of claims.
       *
       * This prevents us from making repeated
       * requests just to determine whether an
       * item has already been claimed.
       */

      const response =
        await claimService.getMyClaims(0, 50);

      setClaims(response.content);

    } catch (error: any) {

      /*
       * Don't show an Alert here.
       *
       * Claim information should never prevent
       * the rest of the application from opening.
       */

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

  /*
   * Initial claim loading.
   */

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

  /*
   * Refresh claims when the application comes
   * back from background.
   *
   * This is useful because an ADMIN may have
   * approved/rejected a claim while the app
   * was not active.
   */

  useEffect(() => {

    const subscription =
      AppState.addEventListener(
        "change",
        (nextState: AppStateStatus) => {

          if (nextState === "active") {

            if (
              isAuthenticated &&
              profile?.role === "STUDENT"
            ) {

              loadClaims(false);

            }

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

  /*
   * Find the student's claim for a specific item.
   *
   * NO API REQUEST HERE.
   *
   * This only searches the local memory cache.
   */

  const getClaimForItem = (
    itemId: number
  ) => {

    return claims.find(
      claim => claim.itemId === itemId
    );

  };

  /*
   * Create claim.
   *
   * The backend response is immediately
   * inserted into our local cache.
   */

  const createClaim = async (
    request: CreateClaimRequest
  ): Promise<Claim> => {

    const newClaim =
      await claimService.createClaim(request);

    setClaims(prev => {

      const alreadyExists =
        prev.some(
          claim =>
            claim.id === newClaim.id
        );

      if (alreadyExists) {
        return prev;
      }

      return [
        newClaim,
        ...prev,
      ];

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