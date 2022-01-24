import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function LogOutButton() {
  const navigation = useNavigation();

  function handlePress() {
    const auth = getAuth();
    Alert.alert("ログアウトします。", "よろしいですか？", [
      {
        text: "No",
        onPress: () => {},
      },
      {
        text: "Yes",
        onPress: () => {
          signOut(auth)
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "LogIn" }],
              });
            })
            .catch((error) => {
              Alert.alert("ログアウトに失敗しました");
            });
        },
      },
    ]);
  }

  return (
    <TouchableOpacity style={StyleSheet.container} onPress={handlePress}>
      <Feather name={"log-out"} size={32} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  label: {
    fontSize: 14,
    color: "#rgba(255, 255, 255, 0.7)",
  },
});
