import React from "react";
import {
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

const OpenSourceLicensesScreen = () => {
  const navigation = useNavigation();

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
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={Colors.text}
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Open Source Licenses
            </Text>

            <Text style={styles.subtitle}>
              Licensing information
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="code-slash-outline"
              size={26}
              color={Colors.primary}
            />
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Open Source Software
            </Text>

            <Text style={styles.heroText}>
              CampusFound is built using open-source technologies and libraries that help make the application possible.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>
          CAMPUSFOUND LICENSE
        </Text>

        <View style={styles.licenseCard}>
          <View style={styles.licenseHeader}>
            <View style={styles.licenseIcon}>
              <Ionicons
                name="document-text-outline"
                size={21}
                color={Colors.primary}
              />
            </View>

            <View style={styles.licenseHeaderText}>
              <Text style={styles.licenseTitle}>
                MIT License
              </Text>

              <Text style={styles.licenseSubtitle}>
                CampusFound
              </Text>
            </View>
          </View>

          <Text style={styles.licenseText}>
            CampusFound is distributed under the MIT License.
            The MIT License is a permissive open-source license
            that allows software to be used, copied, modified,
            merged, published, distributed and sublicensed,
            subject to the conditions included in the license.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          THIRD-PARTY SOFTWARE
        </Text>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color={Colors.primary}
          />

          <Text style={styles.infoText}>
            CampusFound uses third-party open-source packages.
            These packages remain subject to the licenses and
            copyright notices provided by their respective
            authors and projects.
          </Text>
        </View>

        <Text style={styles.note}>
          The complete CampusFound license is available in the
          LICENSE file included with the source code repository.
        </Text>

        <Text style={styles.version}>
          CampusFound · 0.9.0-beta
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
    paddingBottom: 80,
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

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 23,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  heroCard: {
    flexDirection: "row",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySoft,
  },

  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },

  heroContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  heroTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  heroText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },

  sectionLabel: {
    marginBottom: Spacing.sm,
    fontSize: 11,
    letterSpacing: 0.8,
    fontFamily: Fonts.semiBold,
    color: Colors.gray500,
  },

  licenseCard: {
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },

  licenseHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  licenseIcon: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  licenseHeaderText: {
    marginLeft: Spacing.md,
  },

  licenseTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  licenseSubtitle: {
    marginTop: 2,
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  licenseText: {
    marginTop: Spacing.md,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },

  infoText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  note: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },

  version: {
    marginTop: Spacing.xl,
    textAlign: "center",
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Colors.gray400,
  },
});