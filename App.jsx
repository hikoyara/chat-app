import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";

import SignUpScreen from "./src/screens/SignUpScreen";
import LogInScreen from "./src/screens/LogInScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ChatDetailScreen from "./src/screens/ChatDetailScreen";
import ChatEditScreen from "./src/screens/ChatEditScreen";

require("firebase/firestore");

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyB6F8qCH-3Z7yPWYMIDGjJQBYREy2Cc21Q",
  authDomain: "chatapp-44c72.firebaseapp.com",
  projectId: "chatapp-44c72",
  storageBucket: "chatapp-44c72.appspot.com",
  messagingSenderId: "780608989024",
  appId: "1:780608989024:web:d69a89566ba789e4746005",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBbl1Twbw-jEX7L-6e5Hinm5Iq1ZbSfUVE",
//   authDomain: "chatapp2-b7126.firebaseapp.com",
//   projectId: "chatapp2-b7126",
//   storageBucket: "chatapp2-b7126.appspot.com",
//   messagingSenderId: "817204298674",
//   appId: "1:817204298674:web:ad4fe3207a8a902ba8daab",
// };
const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerStyle: { backgroundColor: "#fff", marginVertical: 10 },
          headerTitle: "R E N A D",
          headerTitleStyle: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "20",
          },
          headerTintColor: "#000",
          headerBackTitle: "",
        }}
      >
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ChatEdit" component={ChatEditScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
