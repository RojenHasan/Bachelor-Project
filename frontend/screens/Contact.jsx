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
import emailjs from "emailjs-com";
import * as MailComposer from "expo-mail-composer";
import { supabase } from "../src/lib/supabase";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import BackButton from "../components/auth/BackButton";
import SharedButton from "../components/auth/Button";
import { Ionicons } from "@expo/vector-icons";

const Contact = ({ route }) => {
  const { email: sellerEmail, name: productName } = route.params;
  const [name, setName] = useState("");
  const [message, setMessage] = useState(
    `Hello, I am interested in this product '${productName}' . Please contact me at your earliest convenience. Thank you.`
  );
  const [buyerEmail, setBuyerEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const navigation = useNavigation();

  const handleSendMessage = async () => {
    const recipientEmail = sellerEmail ? sellerEmail : "jeenhasan112@gmail.com";

    try {
      if (!name || !message || !buyerEmail || !telephone) {
        Alert.alert("Please fill in all fields");
        return;
      }

      await MailComposer.composeAsync({
        recipients: [recipientEmail],
        subject: `Message from ${name}`,
        body: `Buyer's Phone Number: ${telephone}\n\nMessage:\n${message} \n\n\n Best Regard`,
      });

      setName("");
      setMessage("");
      setBuyerEmail("");
      setTelephone("");
    } catch (error) {
      console.error("Failed to send email:", error);
      Alert.alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <KeyboardAvoidingView>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Image
              source={require("../assets/images/letter.jpg")}
              style={styles.img}
            />
            <Text style={styles.motto}>Contact Seller</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone number:</Text>
              <TextInput
                style={styles.input}
                value={telephone}
                onChangeText={setTelephone}
                placeholder="Enter your phone number"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Message:</Text>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter the message you want to send to the seller"
                multiline
                numberOfLines={4}
              />
            </View>
            <SharedButton
              style={styles.button}
              title={"Send message"}
              onPress={handleSendMessage}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Contact;

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
    marginTop: SIZES.large,
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
});
