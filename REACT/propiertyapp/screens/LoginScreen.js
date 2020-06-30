import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { AsyncStorage } from "react-native";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendCred = async (props) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      Alert.alert("Email incorrect", `Please enter a email valid to continue.`);
      return false;
    } else if (password.length < 6) {
      Alert.alert(
        "Password incorrect",
        `Please enter a minimum 6 digit password.`
      );
      return false;
    } else if (email && password) {
      try {
        await fetch("http://192.168.1.13:3000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            try {
              await AsyncStorage.setItem("token", data.token);
              props.navigation.replace("HomeScreen");
            } catch (e) {
              console.log("Error", e);
              Alert(e);
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      Alert.alert("Data Incomplete", `Please fill all fields to continue.`);
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <Text
          style={{
            fontSize: 35,
            marginLeft: 18,
            marginTop: 10,
            color: "#ae517a",
          }}
        >
          Welcome to
        </Text>
        <Text style={{ fontSize: 30, marginLeft: 18, color: "#ae517a" }}>
          My propierties
        </Text>
        <View
          style={{
            //borderBottomWidth: 2,
            borderRadius: 10,
            marginLeft: 20,
            marginRight: 150,
            marginTop: 4,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 18,
            marginTop: 20,
          }}
        >
          Login with email
        </Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputStyle}
          theme={theme}
        />
        {/* <Validator type="email" currentValue={email} handler={setEmail} /> */}
        <TextInput
          label="password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.inputStyle}
          theme={theme}
        />

        <Button
          mode="contained"
          theme={theme}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          onPress={() => sendCred(props)}
        >
          Login
        </Button>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 18,
              marginTop: 20,
            }}
            onPress={() => props.navigation.replace("signup")}
          >
            Dont have a account ?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const theme = {
  colors: {
    primary: "#ae517a",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },

  inputStyle: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
  },
});

export default LoginScreen;
