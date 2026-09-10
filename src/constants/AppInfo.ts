import Constants from "expo-constants";

export const APP_VERSION = Constants.expoConfig?.version ?? "Unknown";

export const APP_NAME = Constants.expoConfig?.name ?? "CampusFound";

export const BETA_VERSION_LABEL = `CampusFound Beta v${APP_VERSION}`;