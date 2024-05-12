import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
import client from "../client";
import Input from "../components/auth/input";
import SharedButton from "../components/auth/Button";
import BackButton from "../components/auth/BackButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { useRoute } from "@react-navigation/native";

const BASE_URL = "http://192.168.1.32:3000/api/products"; // Replace with your actual backend URL

const AddItem = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);

      const response = await axios.post(
        "http://192.168.1.32:3000/api/products/",
        formData
      );
      console.log(response.data);
      // Optionally, you can navigate to a different screen or show a success message here
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <KeyboardAvoidingView>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Image
              source={require("../assets/images/bk.png")}
              style={styles.img}
            />
            <Text style={styles.motto}>Add a Product</Text>
            <Input
              placeholder="Product Title"
              icon="tag-outline"
              label={"Title"}
              onChangeText={setTitle}
            />
            <Input
              placeholder="Price"
              icon="currency-usd"
              label={"Price"}
              onChangeText={setPrice}
            />
            <Text> {selectedImage} </Text>
            <Button title="Choose Image" onPress={openImageLibrary} />

            <Input
              placeholder="Description"
              icon="text-box-outline"
              label={"Description"}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <SharedButton
              style={styles.button}
              title={"Add Product"}
              onPress={addProduct}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  scroll: {
    //paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: SIZES.xxLarge,
  },
  inputView: {
    marginHorizontal: 20,
  },
  registered: {
    marginTop: 10,
    color: COLORS.black,
    textAlign: "center",
  },
  img: {
    height: SIZES.height / 3,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },

  motto: {
    marginBottom: 20,
    fontFamily: "bold",
    textAlign: "center",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  button: {
    marginBottom: SIZES.xxl,
  },
});