import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Button,
} from "react-native";
import { Card, FAB } from "react-native-paper";

const Home = ({ navigation, route }) => {
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
        onPress={() => navigation.navigate("Profile", { item })}
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
      <Button title="Login" onPress={() => navigation.navigate("login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
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

export default Home;
