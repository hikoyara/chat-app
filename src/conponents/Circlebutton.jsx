import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { string, func } from "prop-types";

export default function Circlebutton(props) {
  const { style, name, onPress } = props;
  return (
    <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
      <Feather name={name} size={32} color="black" />
    </TouchableOpacity>
  );
}

Circlebutton.protoTypes = {
  onPress: func,
};

Circlebutton.defaultProps = {
  onPress: null,
};

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: "#fff",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 40,
    bottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  circleButtonLabel: {
    color: "white",
    fontSize: 40,
    lineHeight: 40,
  },
});
