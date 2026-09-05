import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Colors,
  Fonts,
  Spacing,
} from "../../theme";

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const SectionHeader = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {actionLabel &&
      onActionPress ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onActionPress}
        >
          <Text style={styles.action}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 19,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  action: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
});