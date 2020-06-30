import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreatePropierty = ({ navigation, route }) => {
  const getDetails = (type_) => {
    if (route.params) {
      switch (type_) {
        case "title":
          return route.params.title;
        case "type_":
          return route.params.type_;
        case "address":
          return route.params.address;
        case "rooms":
          return route.params.rooms;
        case "picture":
          return route.params.picture;
        case "price":
          return route.params.price;
        case "area":
          return route.params.area;
      }
    }
    return "";
  };

  const [title, setTitle] = useState(getDetails("title"));
  const [type_, setType] = useState(getDetails("type_"));
  const [address, setAddress] = useState(getDetails("address"));
  const [rooms, setRooms] = useState(getDetails("rooms"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [price, setPrice] = useState(getDetails("price"));
  const [area, setArea] = useState(getDetails("area"));

  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const submitData = async () => {
     if (title && type_ && address && rooms && price && area) {
      try {
        await fetch("http://192.168.1.13:3000/save", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            type_,
            address,
            rooms,
            picture,
            price,
            area,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            Alert.alert(`${data.title} is saved successfuly`);
            navigation.navigate("HomeScreen");
          })
          .catch((error) => {
            Alert.alert("Someting went wrong");
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      Alert.alert("Data Incomplete", `Please fill all fields to continue.`);
    }
  };

  const updateDetails = () => {
    fetch("http://192.168.1.13:3000/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        title,
        type_,
        address,
        rooms,
        picture,
        price,
        area,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.title} is updated successfuly`);
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        Alert.alert("Someting went wrong");
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("You need to give up permission to work");
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("You need to give up permission to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "dta3svuvn");

    fetch("https://api.cloudinary.com/v1_1/dta3svuvn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // Verify url image
        // console.log(data)
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert("Error while uploading");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableshift}
    >
      <View>
        <TextInput
          label="Title"
          style={styles.inputStyle}
          value={title}
          onFocus={() => setenableShift(false)}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          label="Type"
          style={styles.inputStyle}
          value={type_}
          theme={theme}
          onFocus={() => setenableShift(false)}
          mode="outlined"
          onChangeText={(text) => setType(text)}
        />
        <TextInput
          label="Address"
          style={styles.inputStyle}
          value={address}
          theme={theme}
          onFocus={() => setenableShift(false)}
          mode="outlined"
          onChangeText={(text) => setAddress(text)}
        />

        <TextInput
          label="Rooms"
          style={styles.inputStyle}
          value={`${rooms}`} //here
          theme={theme}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => setRooms(text)}
        />
        <TextInput
          label="Price"
          style={styles.inputStyle}
          value={`${price}`} //here
          theme={theme}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <TextInput
          label="Area"
          style={styles.inputStyle}
          value={`${area}`} //here
          theme={theme}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => setArea(text)}
        />

        <Button
          style={styles.inputStyle}
          icon={picture == "" ? "upload" : "check"}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}
        >
          Upload Image
        </Button>
        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => updateDetails()}
          >
            Update
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => submitData()}
          >
            Save
          </Button>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                icon="camera"
                theme={theme}
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Camera
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                theme={theme}
                onPress={() => pickFromGallery()}
              >
                Gallery
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              Cancel
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
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
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default CreatePropierty;
