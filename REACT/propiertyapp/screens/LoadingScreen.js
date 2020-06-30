import React, { useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";

const LoadingScreen = (props) => {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    // SI CREÓ LA CUENTA O SE LOGUEÓ LO REDIRECCIONA PARA HOME O PARA QUE SE VUELVA A LOGUEAR.
    if (token) {
      props.navigation.replace("HomeScreen");
    } else {
      props.navigation.replace("login");
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
