import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button,
  Alert,
} from "react-native";
import Input from "../components/auth/input";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/auth/BackButton";
import { COLORS, SIZES } from "../constants";
import SharedButton from "../components/auth/Button";

const AddProduct = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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
        setSelectedImage(response.uri);
        Alert.alert("Success", "Image selected successfully!");
      } else {
        Alert.alert("Canceled", "Image selection canceled.");
      }
    }
  };

  const handleAddProduct = (selectedImage) => {
    if (!selectedImage) {
      Alert.alert(
        "No Image Selected",
        "Please select an image for the product."
      );
      return;
    }
    // Prepare the data to send to the backend
    const productData = {
      title: title,
      price: price,
      description: description,
      image: selectedImage,
    };

    // Send the data to the backend
    fetch("http://192.168.1.32:3000/api/products", {
      // Assuming "/api/products" is the endpoint for adding products
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product added successfully:", data);
        // Handle success, e.g., navigate to a success page or refresh the product list
        navigation.navigate("Home"); // Assuming "Home" is the screen where the product list is displayed
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        // Handle error, e.g., display an error message to the user
      });
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
              onChangeText={(text) => setTitle(text)}
            />
            <Input
              placeholder="Price"
              icon="currency-usd"
              label={"Price"}
              onChangeText={(text) => setPrice(text)}
              keyboardType="numeric"
            />

            <Input
              placeholder="Description"
              icon="text-box-outline"
              label={"Description"}
              onChangeText={(text) => setDescription(text)}
              multiline
            />
            {selectedImage && <Image source={{ uri: selectedImage }} />}
            <Button title="Choose Image" onPress={openImageLibrary} />

            <SharedButton
              style={styles.button}
              title={"Add Product"}
              onPress={handleAddProduct}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddProduct;

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
