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

const SuggestPrice = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Bed");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const { t, i18n } = useTranslation();

  const [validationError, setValidationError] = useState("");
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const validateForm = () => {
    if (!name || !description || !type) {
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

      const { data, error } = await supabase
        .from("furniture")
        .insert({
          name: name,
          description: description,
          type: type,
        })
        .select();

      const { data: priceData, error: priceError } = await supabase.rpc(
        "suggest_price",
        {
          query_embedding: data.embedding,
          match_threshold: 0.75,
          match_count: 5,
        }
      );

      if (priceError) {
        console.log("Suggest Price Error:", priceError);
        Alert.alert("Error", priceError.message);
        return;
      }

      setSuggestedPrice(priceData);
      Alert.alert("Suggested Price", `The suggested price is $${priceData}`);

      if (error) {
        console.log("Insert Error:", error);
        Alert.alert("Error", error.message);
      } else {
        console.log("Insert Success:", data);
        Alert.alert("Success", "Furniture added successfully");

        setName("");
        setDescription("");
        setType("Bed");
      }
    } catch (error) {
      console.error("Error:", error);
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Suggested Price:</Text>
              <Text style={styles.suggestedPrice}>${suggestedPrice}</Text>
            </View>
            <SharedButton
              style={styles.button}
              title="Suggest a price"
              onPress={handleAddFurniture}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SuggestPrice;

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
