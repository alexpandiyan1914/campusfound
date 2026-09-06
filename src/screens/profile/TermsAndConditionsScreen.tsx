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

const TERMS_URL =
  "https://github.com/alexpandiyan1914/campusfound/blob/master/TERMS.md";

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();

  const openTerms = async () => {
    await Linking.openURL(TERMS_URL);
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
            Terms & Conditions
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons
            name="document-text-outline"
            size={30}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.title}>
          Using CampusFound
        </Text>

        <Text style={styles.description}>
          CampusFound is intended to help students identify
          and claim lost belongings through the campus Lost &
          Found system.
        </Text>

        <Text style={styles.description}>
          Only submit a claim when you genuinely believe an
          item belongs to you. False or misleading claims are
          not permitted.
        </Text>

        <View style={styles.notice}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color={Colors.primary}
          />

          <Text style={styles.noticeText}>
            Submitting a claim does not confirm ownership.
            Claims are reviewed by an authorized administrator.
            Approved claims still require physical verification
            before item collection.
          </Text>
        </View>

        <Text style={styles.description}>
          CampusFound is currently in beta. Features and
          functionality may change as the application is
          tested and improved.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={openTerms}
        >
          <Text style={styles.primaryButtonText}>
            Read Full Terms & Conditions
          </Text>

          <Ionicons
            name="open-outline"
            size={18}
            color={Colors.white}
          />
        </TouchableOpacity>

        <Text style={styles.footer}>
          Last updated: September 5, 2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;

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
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primarySoft,
  },
  noticeText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
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