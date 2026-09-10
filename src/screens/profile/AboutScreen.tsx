import React from "react";

import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useNavigation,
} from "@react-navigation/native";

import useFeedback
  from "../../hooks/useFeedback";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

const ISSUE_URL =
  "https://github.com/alexpandiyan1914/campusfound/issues";

const AboutScreen = () => {
  const navigation =
    useNavigation();

  const {
    showError,
  } = useFeedback();

  const handleReportIssue =
    async () => {
      try {
        await Linking.openURL(
          ISSUE_URL
        );
      } catch {
        showError(
          "Unable to Open GitHub",
          "Please try again later."
        );
      }
    };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        <View
          style={styles.header}
        >
          <TouchableOpacity
            style={
              styles.backButton
            }
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

          <View
            style={
              styles.headerText
            }
          >
            <Text
              style={
                styles.headerTitle
              }
            >
              CampusFound Beta
            </Text>

            <Text
              style={
                styles.headerSubtitle
              }
            >
              Beta tester guide
            </Text>
          </View>
        </View>

        <View
          style={styles.hero}
        >
          <Image
            source={require(
              "../../assets/images/campusfound-logo.png"
            )}
            style={styles.logo}
          />

          <Text
            style={styles.appName}
          >
            CampusFound
          </Text>

          <View
            style={
              styles.betaBadge
            }
          >
            <View
              style={
                styles.betaDot
              }
            />

            <Text
              style={
                styles.betaText
              }
            >
              BETA v0.9.0
            </Text>
          </View>

          <Text
            style={
              styles.tagline
            }
          >
            Thank you for helping test CampusFound before its official release.
          </Text>
        </View>

        <View
          style={
            styles.testDataNotice
          }
        >
          <View
            style={
              styles.noticeIcon
            }
          >
            <Ionicons
              name="flask-outline"
              size={22}
              color={
                Colors.warning
              }
            />
          </View>

          <View
            style={
              styles.noticeContent
            }
          >
            <Text
              style={
                styles.noticeTitle
              }
            >
              Test environment
            </Text>

            <Text
              style={
                styles.noticeText
              }
            >
              All items currently shown in CampusFound are test data. You may freely claim and interact with them while testing the application.
            </Text>
          </View>
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          WHAT YOU CAN TEST
        </Text>

        <View
          style={styles.card}
        >
          <TestRow
            icon="albums-outline"
            title="Browse items"
            description="Scroll through the latest items available on CampusFound."
          />

          <Divider />

          <TestRow
            icon="search-outline"
            title="Search and filter"
            description="Search for items and browse different item categories."
          />

          <Divider />

          <TestRow
            icon="document-text-outline"
            title="Claim any test item"
            description="Open an available item and submit a sample ownership claim."
          />

          <Divider />

          <TestRow
            icon="time-outline"
            title="Track your claims"
            description="View your submitted claims and their current status."
          />

          <Divider />

          <TestRow
            icon="notifications-outline"
            title="Test notifications"
            description="Check new-item alerts and claim approval or rejection notifications."
          />

          <Divider />

          <TestRow
            icon="person-outline"
            title="Test your account"
            description="Edit your profile, logout and login again to verify the account flow."
          />
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          WHILE TESTING
        </Text>

        <View
          style={styles.infoCard}
        >
          <InstructionRow
            text="Explore different screens and actions normally."
          />

          <InstructionRow
            text="Feel free to claim any item because all current items are test data."
          />

          <InstructionRow
            text="Try actions more than once and check whether the app behaves consistently."
          />

          <InstructionRow
            text="If something looks wrong, crashes, becomes stuck or shows incorrect information, please report it."
            isLast
          />
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          CLAIM VERIFICATION
        </Text>

        <View
          style={
            styles.verificationCard
          }
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={Colors.primary}
          />

          <View
            style={
              styles.verificationContent
            }
          >
            <Text
              style={
                styles.verificationTitle
              }
            >
              App approval is not final collection
            </Text>

            <Text
              style={
                styles.verificationText
              }
            >
              In the official CampusFound workflow, an approved claimant must still visit the Lost & Found office for physical verification before an item is returned.
            </Text>
          </View>
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          FOUND AN ISSUE?
        </Text>

        <View
          style={
            styles.issueCard
          }
        >
          <View
            style={
              styles.issueHeader
            }
          >
            <View
              style={
                styles.issueIcon
              }
            >
              <Ionicons
                name="bug-outline"
                size={21}
                color={
                  Colors.primary
                }
              />
            </View>

            <View
              style={
                styles.issueHeaderText
              }
            >
              <Text
                style={
                  styles.issueTitle
                }
              >
                Report it on GitHub
              </Text>

              <Text
                style={
                  styles.issueDescription
                }
              >
                Your report helps us improve CampusFound before the official release.
              </Text>
            </View>
          </View>

          <View
            style={
              styles.reportGuide
            }
          >
            <InstructionRow
              text="What you were trying to do"
            />

            <InstructionRow
              text="What went wrong"
            />

            <InstructionRow
              text="Steps to reproduce the problem"
            />

            <InstructionRow
              text="Screenshot and device model, if possible"
              isLast
            />
          </View>

          <TouchableOpacity
            style={
              styles.reportButton
            }
            activeOpacity={0.8}
            onPress={
              handleReportIssue
            }
          >
            <Ionicons
              name="logo-github"
              size={20}
              color={Colors.white}
            />

            <Text
              style={
                styles.reportButtonText
              }
            >
              Report an Issue
            </Text>

            <Ionicons
              name="open-outline"
              size={18}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        <View
          style={
            styles.versionCard
          }
        >
          <View>
            <Text
              style={
                styles.versionLabel
              }
            >
              CURRENT VERSION
            </Text>

            <Text
              style={
                styles.versionName
              }
            >
              CampusFound Beta
            </Text>
          </View>

          <Text
            style={
              styles.versionValue
            }
          >
            v0.9.0
          </Text>
        </View>

        <View
          style={
            styles.developerSection
          }
        >
          <Text
            style={
              styles.developedBy
            }
          >
            Developed for Thiagarajar College of Engineering
          </Text>

          <Text
            style={styles.footer}
          >
            © 2026 CampusFound
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface TestRowProps {
  icon:
  keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const TestRow = ({
  icon,
  title,
  description,
}: TestRowProps) => {
  return (
    <View
      style={styles.testRow}
    >
      <View
        style={
          styles.featureIcon
        }
      >
        <Ionicons
          name={icon}
          size={20}
          color={Colors.primary}
        />
      </View>

      <View
        style={
          styles.featureContent
        }
      >
        <Text
          style={
            styles.featureTitle
          }
        >
          {title}
        </Text>

        <Text
          style={
            styles.featureDescription
          }
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

interface InstructionRowProps {
  text: string;
  isLast?: boolean;
}

const InstructionRow = ({
  text,
  isLast = false,
}: InstructionRowProps) => {
  return (
    <View
      style={[
        styles.instructionRow,
        isLast &&
        styles.instructionRowLast,
      ]}
    >
      <Ionicons
        name="checkmark-circle-outline"
        size={18}
        color={Colors.success}
      />

      <Text
        style={
          styles.instructionText
        }
      >
        {text}
      </Text>
    </View>
  );
};

const Divider = () => (
  <View
    style={styles.divider}
  />
);

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
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
    backgroundColor:
      Colors.white,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color:
      Colors.textSecondary,
  },

  hero: {
    alignItems: "center",
    paddingVertical:
      Spacing.md,
    marginBottom:
      Spacing.lg,
  },

  logo: {
    width: 100,
    height: 100,
  },

  appName: {
    marginTop: Spacing.sm,
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  betaBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius:
      Radius.pill,
    backgroundColor:
      Colors.primarySoft,
  },

  betaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
    backgroundColor:
      Colors.primary,
  },

  betaText: {
    fontSize: 10,
    letterSpacing: 0.8,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  tagline: {
    maxWidth: 320,
    marginTop: Spacing.md,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: Fonts.regular,
    color:
      Colors.textSecondary,
  },

  testDataNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom:
      Spacing.xl,
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius:
      Radius.lg,
    backgroundColor:
      Colors.warningSoft,
  },

  noticeIcon: {
    width: 40,
    height: 40,
    borderRadius:
      Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Colors.white,
  },

  noticeContent: {
    flex: 1,
    marginLeft:
      Spacing.md,
  },

  noticeTitle: {
    fontSize: 14,
    fontFamily:
      Fonts.semiBold,
    color: Colors.text,
  },

  noticeText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    fontFamily:
      Fonts.regular,
    color: Colors.gray700,
  },

  sectionTitle: {
    marginBottom:
      Spacing.sm,
    fontSize: 11,
    letterSpacing: 0.8,
    fontFamily:
      Fonts.semiBold,
    color: Colors.gray500,
  },

  card: {
    marginBottom:
      Spacing.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    backgroundColor:
      Colors.white,
    ...Shadows.sm,
  },

  testRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
  },

  featureIcon: {
    width: 40,
    height: 40,
    borderRadius:
      Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Colors.primarySoft,
  },

  featureContent: {
    flex: 1,
    marginLeft:
      Spacing.md,
  },

  featureTitle: {
    fontSize: 14,
    fontFamily:
      Fonts.semiBold,
    color: Colors.text,
  },

  featureDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 17,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

  divider: {
    height: 1,
    marginLeft: 72,
    backgroundColor:
      Colors.gray100,
  },

  infoCard: {
    marginBottom:
      Spacing.xl,
    paddingHorizontal:
      Spacing.md,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    backgroundColor:
      Colors.white,
    ...Shadows.sm,
  },

  instructionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical:
      Spacing.sm,
  },

  instructionRowLast: {
    paddingBottom:
      Spacing.md,
  },

  instructionText: {
    flex: 1,
    marginLeft:
      Spacing.sm,
    fontSize: 12,
    lineHeight: 18,
    fontFamily:
      Fonts.regular,
    color: Colors.gray700,
  },

  verificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom:
      Spacing.xl,
    borderRadius:
      Radius.lg,
    backgroundColor:
      Colors.primarySoft,
  },

  verificationContent: {
    flex: 1,
    marginLeft:
      Spacing.sm,
  },

  verificationTitle: {
    fontSize: 13,
    fontFamily:
      Fonts.semiBold,
    color: Colors.text,
  },

  verificationText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 18,
    fontFamily:
      Fonts.regular,
    color: Colors.gray700,
  },

  issueCard: {
    padding: Spacing.md,
    marginBottom:
      Spacing.xl,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    backgroundColor:
      Colors.white,
    ...Shadows.sm,
  },

  issueHeader: {
    flexDirection: "row",
    alignItems:
      "flex-start",
  },

  issueIcon: {
    width: 42,
    height: 42,
    borderRadius:
      Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Colors.primarySoft,
  },

  issueHeaderText: {
    flex: 1,
    marginLeft:
      Spacing.md,
  },

  issueTitle: {
    fontSize: 14,
    fontFamily:
      Fonts.semiBold,
    color: Colors.text,
  },

  issueDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 17,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

  reportGuide: {
    marginTop:
      Spacing.md,
  },

  reportButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "center",
    marginTop:
      Spacing.md,
    paddingHorizontal:
      Spacing.md,
    borderRadius:
      Radius.md,
    backgroundColor:
      Colors.primary,
  },

  reportButtonText: {
    marginHorizontal:
      Spacing.sm,
    fontSize: 13,
    fontFamily:
      Fonts.semiBold,
    color: Colors.white,
  },

  versionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    padding: Spacing.md,
    marginBottom:
      Spacing.xl,
    borderWidth: 1,
    borderColor:
      Colors.border,
    borderRadius:
      Radius.lg,
    backgroundColor:
      Colors.white,
  },

  versionLabel: {
    fontSize: 9,
    letterSpacing: 0.8,
    fontFamily:
      Fonts.semiBold,
    color: Colors.gray500,
  },

  versionName: {
    marginTop: 4,
    fontSize: 14,
    fontFamily:
      Fonts.semiBold,
    color: Colors.text,
  },

  versionValue: {
    fontSize: 13,
    fontFamily:
      Fonts.bold,
    color: Colors.primary,
  },

  developerSection: {
    alignItems: "center",
  },

  developedBy: {
    maxWidth: 300,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    fontFamily:
      Fonts.regular,
    color: Colors.gray500,
  },

  footer: {
    marginTop:
      Spacing.sm,
    fontSize: 10,
    fontFamily:
      Fonts.regular,
    color: Colors.gray400,
  },
});