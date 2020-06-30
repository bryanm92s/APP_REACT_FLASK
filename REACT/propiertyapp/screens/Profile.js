import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    _id,
    title,
    picture,
    type_,
    address,
    rooms,
    price,
    area,
  } = props.route.params.item;

  const deletePropierty = () => {
    // Endpoint para eliminar propiedades
    fetch("http://192.168.1.13:3000/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedPropiety) => {
        Alert.alert(`${deletedPropiety.title} deleted`);
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Someting went wrong");
      });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#ae517a", "#ff5977"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140 / 2,
            marginTop: -50,
          }}
          source={{ uri: picture }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{title}</Title>
        <Text style={{ fontSize: 15 }}>{type_}</Text>
      </View>

      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <Entypo name="address" size={32} color="#ff5876" />
          <Text style={styles.mytext}>{address}</Text>
        </View>
      </Card>

      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <Fontisto name="room" size={32} color="#ff5876" />
          <Text style={styles.mytext}>{rooms}</Text>
        </View>
      </Card>

      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <Entypo name="home" size={32} color="#ff5876" />
          <Text style={styles.mytext}>{area}</Text>
        </View>
      </Card>

      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#ff5876" />
          <Text style={styles.mytext}>{price}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      ></View>
    </View>
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
});
export default Profile;
