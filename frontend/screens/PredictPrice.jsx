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
import { COLORS, SIZES } from "../constants";
import BackButton from "../components/auth/BackButton";
import SharedButton from "../components/auth/Button";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PredictPrice = () => {
  const [year, setYear] = useState("");
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [seats, setSeats] = useState("");
  const [power, setPower] = useState("");
  const [engine, setEngine] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const navigation = useNavigation();

  const handlePredictPrice = async () => {
    try {
      const response = await axios.post("http://192.168.1.32:3000/predict", {
        Year: parseInt(year),
        Kilometers_Driven: parseInt(kilometersDriven),
        Seats: parseInt(seats),
        Power: parseFloat(power),
        Engine: parseFloat(engine),
      });
      price = response.data.predicted_price * 100000;
      priceInDollar = price * 0.013;
      priceInDollar = priceInDollar.toFixed(2);
      setPredictedPrice(priceInDollar);
      Alert.alert(
        "Predicted Price",
        `The predicted price is $ ${priceInDollar}`
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
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
            <Text style={styles.motto}>Predict Price</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Kilometers Driven</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={kilometersDriven}
                onChangeText={setKilometersDriven}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Seats</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={seats}
                onChangeText={setSeats}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Power</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={power}
                onChangeText={setPower}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Engine</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={engine}
                onChangeText={setEngine}
              />
            </View>
            <SharedButton
              style={styles.button}
              title="Predict"
              onPress={handlePredictPrice}
            />
            {predictedPrice !== null && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                  Predicted Price: ${predictedPrice}
                </Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PredictPrice;

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
