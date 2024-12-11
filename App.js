// IM-2020-116 BM Zahri Affa
import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Switch } from "react-native";
import Button from "./components/button";
import Row from "./components/row";
import calculator, { initialState } from "./util/calculator";

export default class App extends Component {
  state = {
    ...initialState,
    isDarkMode: false, // State to track theme
  };

  HandleTap = (type, value) => {
    this.setState((state) => calculator(type, value, state));
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ isDarkMode: !prevState.isDarkMode }));
  };

  render() {
    const { fullCalculation, currentValue, isDarkMode } = this.state;
    const themeStyles = isDarkMode ? darkStyles : lightStyles;

    return (
      <View style={[styles.container, themeStyles.container]}>
        <SafeAreaView>
          {/* Dark Mode Switch */}
          <View style={styles.switchContainer}>
            <Text style={[styles.switchText, themeStyles.text]}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={this.toggleDarkMode}
              trackColor={{ false: "#ccc", true: "#32CD32" }}
              thumbColor={isDarkMode ? "#32CD32" : "#f4f3f4"}
            />
          </View>

          {/* Display Section */}
          <Text style={[styles.calculation, themeStyles.text]}>{fullCalculation || "0"}</Text>
          <Text style={[styles.result, themeStyles.text]}>
            {parseFloat(currentValue).toLocaleString()}
          </Text>

          {/* Button Rows */}
          <Row>
            <Button text="C" theme="clear" onPress={() => this.HandleTap("clear")} />
            <Button text="⌫" theme="secondary" onPress={() => this.HandleTap("backspace")} />
            <Button text="%" theme="secondary" onPress={() => this.HandleTap("percent")} />
            <Button text="/" theme="operator" onPress={() => this.HandleTap("operator", "/")} />
          </Row>

          <Row>
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" onPress={() => this.HandleTap("number", 9)} />
            <Button text="X" theme="operator" onPress={() => this.HandleTap("operator", "*")} />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.HandleTap("number", 4)} />
            <Button text="5" onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" onPress={() => this.HandleTap("number", 6)} />
            <Button text="-" theme="operator" onPress={() => this.HandleTap("operator", "-")} />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" onPress={() => this.HandleTap("number", 3)} />
            <Button text="+" theme="operator" onPress={() => this.HandleTap("operator", "+")} />
          </Row>

          <Row>
            <Button text="+/-" onPress={() => this.HandleTap("posneg")} />
            <Button text="√" onPress={() => this.HandleTap("squareRoot")} theme="secondary" />
            <Button text="0" onPress={() => this.HandleTap("number", 0)} />
            <Button text="." onPress={() => this.HandleTap("decimal")} />
            <Button text="=" theme="equal" onPress={() => this.HandleTap("equal")} />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  switchText: {
    fontSize: 18,
  },
  calculation: {
    fontSize: 36,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  result: {
    fontSize: 48,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
});

// Light Mode Styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000",
  },
});

// Dark Mode Styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  text: {
    color: "#FFF",
  },
});
