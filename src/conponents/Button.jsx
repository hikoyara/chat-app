import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { func } from "prop-types";

export default function Button(props) {
  const { label, onPress } = props;
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonRabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#000",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginVertical: 24,
  },
  buttonRabel: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: "white",
  },
});
