import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputOutline from "react-native-input-outline";

export default function App() {
  return (
    <View style={styles.container}>
      <InputOutline />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
