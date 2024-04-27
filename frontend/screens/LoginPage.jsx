import { StyleSheet, Text, View, Image, Alert, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { ScrollView } from "react-native";
import Input from "../components/auth/input";
import Button from "../components/auth/Button";
import BackButton from "../components/auth/BackButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [responseData, setResponseData] = useState(null);
  const [inputs, setInput] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  // INPUT VALIDATION
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError("Provide a valid email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Provide a valid email", "email");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    } else if (inputs.password.length < 8) {
      handleError("At least 8 characters are required", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = async () => {
    setLoader(true);
    try {
      const endpoint = "http://192.168.1.34:3000/api/login";
      const data = inputs;
      console.log(data);

      const response = await axios.post(endpoint, data);
      setResponseData(response.data);
      console.log(responseData);

      try {
        setLoader(false);
        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );
        await AsyncStorage.setItem("id", JSON.stringify(responseData._id));
        navigation.replace("Bottom Navigation");
      } catch (error) {
        Alert.alert("Error", "Oops, something went wrong. Try again");
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  const handleChanges = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />

          <Image
            source={require("../assets/images/bk.png")}
            style={styles.img}
          />
          {/* WELCOME TEXT */}

          <Text style={styles.motto}>PIVOT </Text>

          <Input
            placeholder="Enter email"
            icon="email-outline"
            label={"Email"}
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleChanges(text, "email")}
          />

          <Input
            placeholder="Password"
            icon="lock-outline"
            label={"Password"}
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleChanges(text, "password")}
          />

          <Button title={"LOGIN"} onPress={validate} />
          <Text
            style={styles.registered}
            onPress={() => navigation.navigate("Signup")}
          >
            Don't have an account? Register
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  img: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },

  motto: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: SIZES.large,
  },

  registered: {
    marginTop: 10,
    color: COLORS.black,
    textAlign: "center",
  },
});
