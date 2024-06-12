import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ChatBot from "./ChatBot";
import NewFurniture from "./NewFurniture";
import NewestFurniture from "./NewestFurniture";
import Profile from "./Profile";
import "../src/i18n/i18n.config";
import { useTranslation } from "react-i18next";

const Home = () => {
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
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handlePress = () => {
    if (userLoggedIn) {
      navigation.navigate("Cart");
    } else {
      navigation.navigate("Login");
    }
  };
  const handleChatBotPress = () => {
    navigation.navigate("ChatBot");
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("en");
    }
  };
  if (!userData) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.loginBtn}>
            <Text style={styles.menuItemText}>{t("login")}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  if (userData) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.appBarWrapper}>
            <View style={styles.appBar}>
              <Ionicons name="location-outline" size={24} />
              <Text style={styles.location}>
                {userData ? userData.location : "Leuven, Belguim"}
              </Text>

              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={styles.buttonLan}
                  onPress={changeLanguage}
                >
                  <Ionicons name="language-outline" size={36} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView>
            <Welcome />
            <Carousel />
            <NewestFurniture />
            <View style={{ marginVertical: 40 }} />

            <TouchableOpacity
              onPress={handleChatBotPress}
              style={[
                styles.buttonLan,
                { position: "absolute", bottom: 16, right: 16, zIndex: 999 },
              ]}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={36}
                color="black"
                style={styles.chatIcon}
              />
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
};

export default Home;
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
    marginBottom: -20,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: SIZES.xxLarge,
    borderWidth: 0.4,
    borderColor: COLORS.primary,
  },
  menuItemText: {
    fontFamily: "regular",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLan: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatIcon: {
    fontSize: 44,
    color: "black",
  },
});
