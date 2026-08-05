import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  fullName: string;
  email: string;
  role: "STUDENT" | "ADMIN";
}

const ProfileHeader = ({
  fullName,
  email,
  role,
}: Props) => {

  return (

    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons
          name="person"
          size={58}
          color={Colors.white}
        />
      </View>

      <Text style={styles.name}>
        {fullName}
      </Text>

      <Text style={styles.email}>
        {email}
      </Text>

      <View style={styles.roleChip}>

        <Ionicons
          name="school-outline"
          size={16}
          color={Colors.primary}
        />

        <Text style={styles.roleText}>
          {role}
        </Text>

      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.white,

    borderRadius: Radius.xl,

    paddingVertical: 28,

    alignItems: "center",

    marginBottom: Spacing.lg,

    ...Shadows.sm,

  },

  avatarContainer: {

    width: 110,

    height: 110,

    borderRadius: 55,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: Spacing.md,

  },

  name: {

    fontFamily: Fonts.bold,

    fontSize: 24,

    color: Colors.text,

  },

  email: {

    marginTop: 6,

    fontFamily: Fonts.regular,

    color: Colors.textSecondary,

    fontSize: 15,

  },

  roleChip: {

    marginTop: Spacing.md,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#E8F1FF",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 30,

  },

  roleText: {

    marginLeft: 6,

    fontFamily: Fonts.bold,

    color: Colors.primary,

    fontSize: 13,

    textTransform: "capitalize",

  },

});