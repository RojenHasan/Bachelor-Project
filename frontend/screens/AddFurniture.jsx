import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../src/lib/supabase";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import BackButton from "../components/auth/BackButton";
import SharedButton from "../components/auth/Button";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useTranslation } from "react-i18next";
import firestore from "@react-native-firebase/firestore";

const AddFurniture = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo_url, setPhoto_url] = useState("");
  const [type, setType] = useState("Bed");
  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();

  const [validationError, setValidationError] = useState("");
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    checkUserExistence();
  }, []);

  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem("id");
    const userID = `user${JSON.parse(id)}`;
    try {
      const userData = await AsyncStorage.getItem(userID);
      if (userData !== null) {
        const parsedData = JSON.parse(userData);
        setUserLoggedIn(true);
        setUserData(parsedData);

        setEmail(parsedData.email);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };
  const openImageLibrary = async () => {
    console.log("openImageLibrary function called");
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Camera roll permissions not granted");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("ImagePicker Result:", result);

      if (!result.cancelled) {
        const selectedImageUrl = result.assets[0].uri;
        console.log("Selected image URI:", selectedImageUrl);
        setPhoto_url(selectedImageUrl);
        console.log("photoUrl after setting:", selectedImageUrl);
      } else {
        console.log("Image selection canceled");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("Error selecting image. Please try again.");
    }
  };
  const validateForm = () => {
    if (!name || !description || !price || !type || !email || !photo_url) {
      setValidationError("All fields are required");
      return false;
    }
    return true;
  };

  const handleAddFurniture = async () => {
    if (!validateForm()) {
      Alert.alert("Failed to add Furniture", "All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: photo_url,
        type: "image/jpeg",
        name: `${name}_image.jpg`,
      });
      formData.append("upload_preset", "furnitureApp");
      formData.append("cloud_name", "di5aci5xb");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/di5aci5xb/image/upload",
        {
          method: "post",
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log("Image uploaded to Cloudinary:", responseData.secure_url);

      const { secure_url } = responseData;

      const { data, error } = await supabase
        .from("furniture")
        .insert({
          name: name,
          description: description,
          price: price,
          photo_url: secure_url,
          type: type,
          email: email,
        })
        .select();

      if (error) {
        console.log("Insert Error:", error);
        Alert.alert("Error", error.message);
      } else {
        console.log("Insert Success:", data);
        Alert.alert("Success", "Furniture added successfully");
        // const furnitureData = {
        //   name: name,
        //   description: description,
        //   price: price,
        //   photo_url: secure_url,
        //   type: type,
        //   email: email,
        // };

        // await firestore().collection("furniture").add(furnitureData);
        setName("");
        setDescription("");
        setPrice("");
        setPhoto_url("");
        setType("");
        setEmail("");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      alert("Error uploading image to Cloudinary. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <KeyboardAvoidingView>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Image
              source={require("../assets/images/bk.png")}
              style={styles.img}
            />
            <Text style={styles.motto}>{t("add")}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("your-email")}</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder={t("Enter-your-email")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("Name")}:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t("Enter-furniture-name")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("Description")}:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder={t("Enter-furniture-description")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("Price")}:</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder={t("Enter-furniture-price")}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity onPress={openImageLibrary}>
              <View style={styles.chooseImageContainer}>
                <Ionicons name="image-outline" size={34} color="black" />
                <Text style={styles.chooseImageText}>{t("Choose-Image")}</Text>
              </View>
            </TouchableOpacity>
            {photo_url ? (
              <Image
                source={{ uri: photo_url }}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <Text style={styles.noImageText}>{t("No-image-selected")}</Text>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={type}
                  onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label={t("Kids")} value="Kids" />
                  <Picker.Item label={t("Bed")} value="Bed" />
                  <Picker.Item label={t("Sofa")} value="Sofa" />
                  <Picker.Item label={t("Kitchen")} value="Kitchen" />
                  <Picker.Item label={t("Outdoor")} value="Outdoor" />
                </Picker>
              </View>
            </View>
            <SharedButton
              style={styles.button}
              title={t("add")}
              onPress={handleAddFurniture}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddFurniture;

const styles = StyleSheet.create({
  scroll: {
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
  chooseImageButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  chooseImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chooseImageText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pickerItem: {
    fontSize: 18,
    color: "black",
  },
  noImageText: {
    marginBottom: 20,
    marginTop: 10,
  },
});
