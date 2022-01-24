import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

import { dateToString } from "../utils";

export default function ChatBox(props) {
  const { chats } = props;
  const navigation = useNavigation();

  // カウンター
  // const [counter, setCounter] = useState(1);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.chatBoxItem}
        onPress={() => {
          navigation.navigate("ChatDetail", { id: item.id });

          const auth = getAuth();
          const user = auth.currentUser;
          const db = getFirestore();
          const ref = doc(db, `chats/${item.id}/viewUsers/${user.uid}`);

          const counter = [];
          getDoc(ref).then((snapshot) => {
            const data = snapshot.data();
            if (data) {
              counter.push({
                viewCount: data.viewCount,
              });
              setDoc(ref, {
                userName: user.email,
                viewCount: counter[0].viewCount + 1,
                updatedAdd: new Date(),
              });
            } else {
              setDoc(ref, {
                userName: user.email,
                viewCount: 1,
                updatedAdd: new Date(),
              });
            }
          });
        }}
      >
        <View>
          <Text style={styles.chatBoxItemTitle} numberOfLines={1}>
            {item.bodyTitle}
          </Text>
          <Text style={styles.chatBoxItemDate}>
            {dateToString(item.updatedAdd)}
          </Text>
        </View>

        {/* <TouchableOpacity
        style={styles.chatDelete}
        onPress={() => {
          Alert.alert("sure?");
        }}
      >
        <Feather name="x" size={16} color="#b0b0b0" />
      </TouchableOpacity> */}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatBoxItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 1)",
    marginTop: 20,
    borderRadius: 10,
  },
  chatBoxItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 32,
  },
  chatBoxItemDate: {
    fontSize: 16,
    lineHeight: 16,
    color: "#463d3d",
  },
  chatDelete: {
    padding: 8,
  },
});
