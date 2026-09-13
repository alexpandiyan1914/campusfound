import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import appVersionService
  from "../../services/appVersionService";

import {
  APP_VERSION,
} from "../../constants/AppInfo";

import {
  AppVersionResponse,
} from "../../types/appVersion";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";


interface Props {
  children: ReactNode;
}


const MAX_RETRIES = 6;
const RETRY_DELAY_MS = 5000;


const AppUpdateChecker = ({
  children,
}: Props) => {

  const [
    checking,
    setChecking,
  ] = useState(true);

  const [
    retryCount,
    setRetryCount,
  ] = useState(0);

  const [
    serverUnavailable,
    setServerUnavailable,
  ] = useState(false);

  const [
    update,
    setUpdate,
  ] =
    useState<AppVersionResponse | null>(
      null
    );

  const mountedRef =
    useRef(true);


  useEffect(() => {

    mountedRef.current = true;

    checkVersion();

    return () => {
      mountedRef.current = false;
    };

  }, []);


  useEffect(() => {

    if (!update) {
      return;
    }

    const subscription =
      BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          BackHandler.exitApp();
          return true;
        }
      );

    return () => {
      subscription.remove();
    };

  }, [update]);


  const sleep = (
    milliseconds: number
  ) =>
    new Promise(resolve =>
      setTimeout(
        resolve,
        milliseconds
      )
    );


  const checkVersion =
    async () => {

      if (!mountedRef.current) {
        return;
      }

      setChecking(true);
      setServerUnavailable(false);

      for (
        let attempt = 1;
        attempt <= MAX_RETRIES;
        attempt++
      ) {

        if (!mountedRef.current) {
          return;
        }

        setRetryCount(
          attempt - 1
        );

        try {

          const response =
            await appVersionService
              .getLatestVersion();

          if (!mountedRef.current) {
            return;
          }

          /*
           * Backend responded successfully.
           */
          if (
            response.latestVersion !==
            APP_VERSION
          ) {

            setUpdate(response);

          }

          setChecking(false);

          return;

        } catch (error) {

          console.log(
            `CampusFound startup check failed. Attempt ${attempt}/${MAX_RETRIES}`,
            error
          );

          /*
           * Render free instances may be
           * waking from sleep.
           * backend is still starting.
           */
          if (
            attempt < MAX_RETRIES
          ) {

            await sleep(
              RETRY_DELAY_MS
            );

          }

        }
      }

      if (
        mountedRef.current
      ) {

        setChecking(false);
        setServerUnavailable(true);

      }
    };


  const handleRetry =
    () => {

      setRetryCount(0);

      checkVersion();
    };


  const handleUpdate =
    async () => {

      if (!update?.releaseUrl) {
        return;
      }

      try {

        await Linking.openURL(
          update.releaseUrl
        );

      } catch (error) {

        console.log(
          "Unable to open update URL:",
          error
        );

      }
    };


  const handleExit =
    () => {

      if (
        Platform.OS ===
        "android"
      ) {

        BackHandler.exitApp();

      }
    };


  if (checking) {

    return (
      <View
        style={
          styles.loadingContainer
        }
      >

        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text
          style={
            styles.loadingTitle
          }
        >
          Starting CampusFound...
        </Text>

        <Text
          style={
            styles.loadingText
          }
        >
          {retryCount === 0
            ? "Connecting to the CampusFound server."
            : "The beta server is waking up. This may take a few moments."}
        </Text>

      </View>
    );
  }


  if (serverUnavailable) {

    return (
      <View
        style={
          styles.loadingContainer
        }
      >

        <View
          style={
            styles.serverIconContainer
          }
        >

          <Ionicons
            name="cloud-offline-outline"
            size={32}
            color={Colors.primary}
          />

        </View>

        <Text
          style={
            styles.loadingTitle
          }
        >
          Unable to connect
        </Text>

        <Text
          style={
            styles.loadingText
          }
        >
          CampusFound could not connect to the server.
          Please check your internet connection and try again.
        </Text>

        <TouchableOpacity
          style={
            styles.retryButton
          }
          activeOpacity={0.82}
          onPress={
            handleRetry
          }
        >

          <Ionicons
            name="refresh-outline"
            size={20}
            color={Colors.white}
          />

          <Text
            style={
              styles.retryButtonText
            }
          >
            Try Again
          </Text>

        </TouchableOpacity>

      </View>
    );
  }


  return (
    <>
      {children}

      <Modal
        visible={!!update}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={
          handleExit
        }
      >

        <View
          style={
            styles.overlay
          }
        >

          <View
            style={
              styles.modalCard
            }
          >

            <View
              style={
                styles.iconContainer
              }
            >

              <Ionicons
                name="cloud-download-outline"
                size={30}
                color={Colors.primary}
              />

            </View>


            <Text
              style={
                styles.title
              }
            >
              Update Required
            </Text>


            <Text
              style={
                styles.message
              }
            >
              {update?.message}
            </Text>


            <View
              style={
                styles.versionBox
              }
            >

              <View>

                <Text
                  style={
                    styles.versionLabel
                  }
                >
                  INSTALLED
                </Text>

                <Text
                  style={
                    styles.currentVersion
                  }
                >
                  v{APP_VERSION}
                </Text>

              </View>


              <Ionicons
                name="arrow-forward"
                size={20}
                color={
                  Colors.gray400
                }
              />


              <View
                style={
                  styles.versionRight
                }
              >

                <Text
                  style={
                    styles.versionLabel
                  }
                >
                  REQUIRED
                </Text>

                <Text
                  style={
                    styles.latestVersion
                  }
                >
                  v{update?.latestVersion}
                </Text>

              </View>

            </View>


            <Text
              style={
                styles.helperText
              }
            >
              All beta testers must use the latest CampusFound version so issues can be tested consistently.
            </Text>


            <TouchableOpacity
              style={
                styles.updateButton
              }
              activeOpacity={0.82}
              onPress={
                handleUpdate
              }
            >

              <Ionicons
                name="download-outline"
                size={20}
                color={Colors.white}
              />

              <Text
                style={
                  styles.updateButtonText
                }
              >
                Update CampusFound
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={
                styles.exitButton
              }
              activeOpacity={0.75}
              onPress={
                handleExit
              }
            >

              <Text
                style={
                  styles.exitButtonText
                }
              >
                Exit App
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>
    </>
  );
};


export default AppUpdateChecker;


const styles =
  StyleSheet.create({

    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal:
        Spacing.xl,
      backgroundColor:
        Colors.background,
    },

    loadingTitle: {
      marginTop:
        Spacing.md,
      textAlign: "center",
      fontSize: 18,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.text,
    },

    loadingText: {
      maxWidth: 320,
      marginTop:
        Spacing.sm,
      textAlign: "center",
      fontSize: 13,
      lineHeight: 20,
      fontFamily:
        Fonts.regular,
      color:
        Colors.textSecondary,
    },

    serverIconContainer: {
      width: 62,
      height: 62,
      borderRadius: 31,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        Colors.primarySoft,
    },

    retryButton: {
      minHeight: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop:
        Spacing.lg,
      paddingHorizontal:
        Spacing.xl,
      borderRadius:
        Radius.md,
      backgroundColor:
        Colors.primary,
    },

    retryButtonText: {
      marginLeft:
        Spacing.sm,
      fontSize: 14,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.white,
    },

    overlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.lg,
      backgroundColor:
        "rgba(15, 23, 42, 0.65)",
    },

    modalCard: {
      width: "100%",
      maxWidth: 390,
      padding: Spacing.xl,
      borderRadius:
        Radius.xl,
      backgroundColor:
        Colors.white,
      ...Shadows.lg,
    },

    iconContainer: {
      width: 58,
      height: 58,
      borderRadius: 29,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor:
        Colors.primarySoft,
    },

    title: {
      marginTop:
        Spacing.md,
      textAlign: "center",
      fontSize: 21,
      fontFamily:
        Fonts.bold,
      color: Colors.text,
    },

    message: {
      marginTop:
        Spacing.sm,
      textAlign: "center",
      fontSize: 13,
      lineHeight: 20,
      fontFamily:
        Fonts.regular,
      color:
        Colors.textSecondary,
    },

    versionBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      marginTop:
        Spacing.lg,
      padding: Spacing.md,
      borderRadius:
        Radius.md,
      backgroundColor:
        Colors.gray50,
      borderWidth: 1,
      borderColor:
        Colors.border,
    },

    versionRight: {
      alignItems: "flex-end",
    },

    versionLabel: {
      fontSize: 9,
      letterSpacing: 0.7,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.gray500,
    },

    currentVersion: {
      marginTop: 4,
      fontSize: 14,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.gray600,
    },

    latestVersion: {
      marginTop: 4,
      fontSize: 14,
      fontFamily:
        Fonts.bold,
      color:
        Colors.primary,
    },

    helperText: {
      marginTop:
        Spacing.md,
      textAlign: "center",
      fontSize: 11,
      lineHeight: 17,
      fontFamily:
        Fonts.regular,
      color:
        Colors.gray500,
    },

    updateButton: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop:
        Spacing.lg,
      borderRadius:
        Radius.md,
      backgroundColor:
        Colors.primary,
    },

    updateButtonText: {
      marginLeft:
        Spacing.sm,
      fontSize: 14,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.white,
    },

    exitButton: {
      minHeight: 46,
      alignItems: "center",
      justifyContent: "center",
      marginTop:
        Spacing.sm,
    },

    exitButtonText: {
      fontSize: 13,
      fontFamily:
        Fonts.medium,
      color:
        Colors.gray500,
    },

  });