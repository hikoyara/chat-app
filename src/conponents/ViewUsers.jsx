import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  query,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { dateToString } from "../utils";

export default function ViewUsers(props) {
  const { viewUser } = props;
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <View key={viewUser.id}>
        <View style={styles.viewUserContainer}>
          <Text style={styles.viewUserText}>
            {item.userName}: {item.viewCount}　　latest:{" "}
            {dateToString(item.lastView)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={viewUser}
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
    marginBottom: 20,
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
  viewUserContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  viewUserText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
