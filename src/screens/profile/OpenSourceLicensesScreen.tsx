import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
} from "../../theme";

const LICENSE_URL =
  "https://github.com/alexpandiyan1914/campusfound/blob/master/LICENSE";

const OpenSourceLicensesScreen = () => {
  const navigation = useNavigation();

  const openLicense = async () => {
    await Linking.openURL(LICENSE_URL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={Colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Open Source Licenses
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons
            name="code-slash-outline"
            size={30}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.title}>
          MIT License
        </Text>

        <Text style={styles.description}>
          CampusFound is an open-source project distributed
          under the MIT License.
        </Text>

        <Text style={styles.description}>
          CampusFound also uses open-source libraries and
          technologies. Third-party packages remain subject
          to the licenses and copyright notices provided by
          their respective authors.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={openLicense}
        >
          <Text style={styles.primaryButtonText}>
            View MIT License
          </Text>

          <Ionicons
            name="open-outline"
            size={18}
            color={Colors.white}
          />
        </TouchableOpacity>

        <Text style={styles.footer}>
          CampusFound · v0.9.0-beta
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpenSourceLicensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
    backgroundColor: Colors.primarySoft,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  primaryButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },
  primaryButtonText: {
    marginRight: Spacing.sm,
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
  footer: {
    marginTop: Spacing.lg,
    textAlign: "center",
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});