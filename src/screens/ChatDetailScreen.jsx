import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { shape } from "prop-types";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";

import ViewUsers from "../conponents/ViewUsers";
import { string } from "prop-types";
import { dateToString } from "../utils";

export default function ChatDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [chat, setChat] = useState(null);
  const [viewUser, setViewUser] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    const q = query(collection(db, `chats`));
    const docRef = doc(q, id);
    const unsub = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setChat({
        id: doc.id,
        addUserEmail: data.addUserEmail,
        bodyTitle: data.bodyTitle,
        bodyText: data.bodyText,
        updatedAdd: data.updatedAdd.toDate(),
      });
    });

    return unsub;
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    // const viewRef = collection(db, `chats/${id}/viewUsers`);
    // getDocs(viewRef).then((querySnapshot) => {
    //   querySnapshot.docs.forEach((doc) => console.log(doc.data()));
    // });

    const viewQ = query(
      collection(db, `chats/${id}/viewUsers`),
      orderBy("updatedAdd", "desc")
    );
    const viewUnsub = onSnapshot(viewQ, (viewSnap) => {
      const viewUsers = [];
      viewSnap.forEach((viewDoc) => {
        const data = viewDoc.data();
        viewUsers.push({
          viewCount: data.viewCount,
          userName: data.userName,
          lastView: data.updatedAdd.toDate(),
        });
      });
      setViewUser(viewUsers);
    });
    return viewUnsub;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {chat && chat.bodyTitle}
        </Text>
        <Text style={styles.memoDate}>
          {chat && dateToString(chat.updatedAdd)}
        </Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <View style={styles.memoBodyInner}>
          <Text style={styles.memoUser}>
            投稿者: {chat && chat.addUserEmail}
          </Text>

          <Text style={styles.memoText}>{chat && chat.bodyText}</Text>
        </View>
      </ScrollView>

      <View style={styles.viewUserContainer}>
        <Text style={styles.viewUserText}>既読</Text>
        <ViewUsers viewUser={viewUser} />
      </View>
    </View>
  );
}

ChatDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  memoHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 96,
    justifyContent: "center",
    paddingTop: 24,
    paddingHorizontal: 19,
    borderBottomWidth: 2,
  },
  memoTitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 26,
  },
  memoDate: {
    color: "#000",
    fontSize: 12,
    lineHeight: 16,
  },

  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyInner: { paddingVertical: 32 },
  memoUser: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 32,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 48,
  },

  viewUserContainer: {
    top: -50,
    paddingTop: 24,
    paddingHorizontal: 27,
    height: 150,
    borderTopWidth: 2,
    backgroundColor: "#fff",
  },
  viewUserText: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 24,
    marginBottom: 16,
  },
});
