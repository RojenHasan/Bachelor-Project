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
import Input from "../components/auth/input";
import SharedButton from "../components/auth/Button";
import BackButton from "../components/auth/BackButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "react-native-image-picker";

const AddItem = ({ navigation }) => {
  const [selectImage, setSelectImage] = useState("");
  const OnGalleryPress = () => {
    const options = {
      mediaType: "photo",
    };
    try {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.error("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          const source = { uri: response.assets[0].uri };
          console.log("response", JSON.stringify(response));
          setSelectImage(source.uri);
        }
      });
    } catch (error) {
      console.error("Failed to launch image library:", error);
    }
  };

  const [inputs, setInput] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.title) {
      handleError("Please input title", "title");
      valid = false;
    }

    if (!inputs.price) {
      handleError("Please input price", "price");
      valid = false;
    }

    if (!inputs.description) {
      handleError("Please input description", "description");
      valid = false;
    }

    if (valid) {
      addProduct();
    }
  };

  const addProduct = async () => {
    try {
      const endpoint = "http://192.168.1.34:3000/api/products";
      const response = await axios.post(endpoint, inputs);
      if (response.status === 200) {
        Alert.alert("Success", "Product added successfully");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add the product");
    }
  };

  const handleChanges = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
    if (errors[input]) {
      handleError(null, input);
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

            <Image source={{ uri: selectImage }} style={styles.imagePreview} />

            {/* <TouchableOpacity
              onPress={OnGalleryPress}
              activeOpacity={1}
              style={{ padding: 10 }}
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={30}
                color={COLORS.green}
              />
            </TouchableOpacity> */}
            

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
