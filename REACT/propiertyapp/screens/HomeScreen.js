import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import { AsyncStorage } from "react-native";

const HomeScreen = ({ navigation }, props) => {
  const [email, setEmail] = useState("loading");
  const Boiler = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("http://192.168.1.13:3000/allpropierties_token", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("http://192.168.1.13:3000/allpropierties")
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Someting went wrong");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate("Profile_Edit", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: item.picture }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>Rooms: {item.rooms}</Text>
            <Text style={styles.text}>Address: {item.address}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
      <Text style={{ fontSize: 18 }}>Welcome, {email}</Text>
      <FAB
        onPress={() => navigation.navigate("Create")}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#e41d5a" } }}
      />
      {/*  <Button mode="outlined" title="Logout" onPress={() => navigation.navigate("Home")} /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#b7b7b7",
    padding: 10,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
