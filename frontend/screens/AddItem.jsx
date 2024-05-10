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

import Input from "../components/auth/input";
import SharedButton from "../components/auth/Button";
import BackButton from "../components/auth/BackButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { useRoute } from "@react-navigation/native";

const AddItem = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [errors, setErrors] = useState({});
  const route = useRoute();

  const selectPhoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 400,
        maxHeight: 400,
        includeBase64: true,
      },
      (response) => {
        console.log(launchImageLibrary); // Check if it's defined and not null

        if (response.didCancel) {
          // User canceled the image selection
          console.log("Image selection canceled");
        } else if (response.error) {
          // An error occurred during image selection
          console.error("Image selection error:", response.error);
        } else {
          // Image selected successfully
          const data = `data:${response.mime};base64,${response.base64}`;
          setSelectedImage(response.uri);
        }
      }
    ).catch((error) => {
      // Handle any unhandled promise rejections
      console.error("Promise rejection:", error);
    });
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!title) {
      handleError("Please input title", "title");
      valid = false;
    }

    if (!price) {
      handleError("Please input price", "price");
      valid = false;
    }

    if (!description) {
      handleError("Please input description", "description");
      valid = false;
    }

    if (valid) {
      addProduct();
    }
  };
  const handleChanges = (text, input) => {
    switch (input) {
      case "title":
        setTitle(text);
        break;
      case "price":
        setPrice(text);
        break;
      case "description":
        setDescription(text);
        break;
      // Assuming there's an "image" input as well
      case "image":
        setImage(text);
        break;
      default:
        break;
    }

    if (errors[input]) {
      handleError(null, input);
    }
  };

  const addProduct = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", {
      name: "productImage.jpg",
      type: "image/jpeg",
      uri: selectedImage, // Assuming you're sending the URI
    });

    axios
      .post("http://192.168.1.32:3000/api/products", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "Ok") {
          Toast.show({
            type: "success",
            text1: "Added",
          });
        }
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
              error={errors.title}
              onChangeText={(text) => handleChanges(text, "title")}
            />
            <Input
              placeholder="Price"
              icon="currency-usd"
              label={"Price"}
              error={errors.price}
              onChangeText={(text) => handleChanges(text, "price")}
            />
            <TouchableOpacity onPress={() => selectPhoto()}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
              ) : (
                <Text>Select an Image</Text>
              )}
            </TouchableOpacity>

            <Input
              placeholder="Description"
              icon="text-box-outline"
              label={"Description"}
              error={errors.description}
              onChangeText={(text) => handleChanges(text, "description")}
            />
            <SharedButton
              style={styles.button}
              title={"Add Product"}
              onPress={validate}
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
