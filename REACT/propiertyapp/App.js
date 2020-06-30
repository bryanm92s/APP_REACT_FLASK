import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import Home from "./screens/Home";
import CreatePropierty from "./screens/CreatePropierty";
import Profile from "./screens/Profile";
import Profile_Edit from "./screens/Profile_Edit";

import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";

import { AsyncStorage } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const myOptions = {
  title: "List",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#af567d",
  },
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            ...myOptions,
            title: "Welcome",
            headerLeft: null,
            gesturesEnabled: false,
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: "Profile" }}
        />

        <Stack.Screen
          name="Profile_Edit"
          component={Profile_Edit}
          options={{ ...myOptions, title: "Profile Edit" }}
        />

        <Stack.Screen
          name="Create"
          component={CreatePropierty}
          options={{ ...myOptions, title: "Create Propierty" }}
        />

        <Stack.Screen
          name="loading"
          component={LoadingScreen}
          options={{ ...myOptions, title: "Loading" }}
        />

        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ ...myOptions, title: "Login" }}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{ ...myOptions, title: "Sign Up" }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b7b7b7",
  },
});
