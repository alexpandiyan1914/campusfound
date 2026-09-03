export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;

  ForgotPassword: undefined;

  ForgotPasswordOtp: {
    email: string;
  };

  ResetPassword: {
    resetToken: string;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Report: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type RootStackParamList = {

  MainTabs: undefined;

  ItemDetails: {
    itemId: number;
  };

};