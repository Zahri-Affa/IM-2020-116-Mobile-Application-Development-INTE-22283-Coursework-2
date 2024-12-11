// IM-2020-116 BM Zahri Affa
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
