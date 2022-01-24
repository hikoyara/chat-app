import React from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import ChatBox from "../conponents/ChatBox";
import Circlebutton from "../conponents/Circlebutton";
import LogOutButton from "../conponents/LogOutButton";
import Loading from "../conponents/Loading";

export default function ChatScreen(props) {
  const { navigation } = props;

  navigation.setOptions({
    headerRight: () => <LogOutButton />,
  });

  const [chats, setChats] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    setLoading(true);

    const q = query(collection(db, `chats`), orderBy("updatedAdd", "desc"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const userChats = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          userChats.push({
            id: doc.id,
            bodyTitle: data.bodyTitle,
            bodyText: data.bodyText,
            updatedAdd: data.updatedAdd.toDate(),
          });
        });
        setChats(userChats);
        setLoading(false);
      },
      (error) => {
        console.log(console.error);
        setLoading(false);
        Alert.alert("データの読み込みに失敗しました。");
      }
    );
    return unsub;
  }, []);

  if (chats.length === 0) {
    return (
      <View style={styles.noChatsContainer}>
        <Loading isLoading={isLoading} />

        <Text style={styles.noChatsText}>投稿はありません</Text>

        <Circlebutton
          name="plus"
          onPress={() => {
            navigation.navigate("ChatEdit");
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChatBox chats={chats} />

      <Circlebutton
        name="plus"
        onPress={() => {
          navigation.navigate("ChatEdit");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  noChatsText: {
    marginTop: "65%",
    fontSize: 24,
    color: "#707070",
  },
});
