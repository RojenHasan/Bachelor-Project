import React, { useState } from "react";
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

const AddFurniture = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo_url, setPhoto_url] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  const [validationError, setValidationError] = useState("");
  const navigation = useNavigation();

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
        setPhoto_url(selectedImageUrl); // Update photoUrl state with the selected image URI
        console.log("photoUrl after setting:", selectedImageUrl); // Log the updated photoUrl
      } else {
        console.log("Image selection canceled");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("Error selecting image. Please try again.");
    }
  };
  const validateForm = () => {
    if (!name || !description || !price || !type || !email) {
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
    const { data, error } = await supabase
      .from("furniture")
      .insert({
        name: name,
        description: description,
        price: price,
        photo_url: photo_url,
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
      setName("");
      setDescription("");
      setPrice("");
      setPhoto_url("");
      setType("");
      setEmail("");
      navigation.goBack();
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
            <Text style={styles.motto}>Add a Product</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Your email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter furniture name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter furniture description"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price:</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter furniture price"
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity onPress={openImageLibrary}>
              <View style={styles.chooseImageContainer}>
                <Ionicons name="image-outline" size={34} color="black" />
                <Text style={styles.chooseImageText}>Choose Image</Text>
              </View>
            </TouchableOpacity>
            {photo_url ? (
              <Image
                source={{ uri: photo_url }}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <Text>No image selected</Text>
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
                  <Picker.Item label="Bed" value="Bed" />
                  <Picker.Item label="Sofa" value="Sofa" />
                  <Picker.Item label="Kitchen" value="Kitchen" />
                  <Picker.Item label="Kids" value="Kids" />
                  <Picker.Item label="Outdoor" value="Outdoor" />
                </Picker>
              </View>
            </View>
            <SharedButton
              style={styles.button}
              title={"Add Furniture"}
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
  chooseImageButton: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Center items vertically
    marginBottom: 20,
  },
  chooseImageContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Center items vertically
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
});
