import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Circlebutton from "../conponents/Circlebutton";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function ChatEditScreen(props) {
  const { navigation } = props;
  const [bodyTitle, setBodyTitle] = useState("");
  const [bodyText, setBodyText] = useState("");

  function handlePress() {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    // setDoc(
    //   doc(db, "users", user.uid),
    //   { bodyTitle, bodyText, updatedAdd: new Date() },

    //   navigation.goBack()
    // );

    // 絶対に消さない
    // addDoc(collection(db, "users", user.uid, "chats"), {
    //   bodyTitle,
    //   bodyText,
    //   updatedAdd: new Date(),
    // });

    addDoc(collection(db, "chats"), {
      addUser: user.uid,
      addUserEmail: user.email,
      bodyTitle,
      bodyText,
      updatedAdd: new Date(),
    });

    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyTitle}
          autoCapitalize="none"
          placeholder="タイトルを入力"
          style={styles.inputTitle}
          numberOfLines={1}
          onChangeText={(text) => {
            setBodyTitle(text);
          }}
        />

        <TextInput
          value={bodyText}
          autoCapitalize="none"
          placeholder="本文"
          multiline
          style={styles.inputText}
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>

      <Circlebutton name="check" onPress={handlePress} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  inputContainer: {
    paddingVertical: 32,
    flex: 1,
  },
  inputTitle: {
    fontSize: 20,
  },
  inputText: {
    fontSize: 20,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderColor: "#f0f0f0",
  },
});
