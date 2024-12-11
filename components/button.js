// IM-2020-116 BM Zahri Affa
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  // Adjust for size
  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  // Apply theme styles
  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  } else if (theme === "operator") {
    buttonStyles.push(styles.buttonOperator); // Light blue for operators
  } else if (theme === "equal") {
    buttonStyles.push(styles.buttonEqual); // Green for '='
  } else if (theme === "clear") {
    buttonStyles.push(styles.buttonClear); // Red for 'C' and backspace
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

// Set dimensions
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333", // Default background color
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  textSecondary: {
    color: "#060606",
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: "#a6a6a6", // Gray for secondary buttons
  },
  buttonAccent: {
    backgroundColor: "#ffc107", // Accent buttons (numbers)
  },
  buttonOperator: {
    backgroundColor: "#4b94ff", // Light blue for operators
  },
  buttonEqual: {
    backgroundColor: "#4CAF50", // Green for '='
  },
  buttonClear: {
    backgroundColor: "#f44336", // Red for 'C' and backspace
  },
});
