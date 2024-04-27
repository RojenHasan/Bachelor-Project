import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./home.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState("0");

  useEffect(() => {
    checkUserExistence();
  }, []);
  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem("id");
    const userID = `user${JSON.parse(id)}`;
    try {
      const userData = await AsyncStorage.getItem(userID);
      if (userData !== null) {
        // User data exists
        const parsedData = JSON.parse(userData);
        // Use the retrieved data as needed
        setUserLoggedIn(true);
        setUserData(parsedData);
        // setUserLocation(userData.location)

        const count = await AsyncStorage.getItem("cartCount");

        if (count !== null) {
          const parsedCart = JSON.parse(count);
          setCartCount(parsedCart);
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };
  const handlePress = () => {
    if (userLoggedIn) {
      navigation.navigate("Cart");
    } else {
      // Navigate to the Login page when hasId is false
      navigation.navigate("Login");
    }
  };

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
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>
                  {cartCount ? cartCount : 0}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handlePress()}>
                <Fontisto name="shopping-bag" size={24}></Fontisto>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <Welcome />
          <Carousel />
          <Headings />
          <ProductRow />
          <View style={{ marginVertical: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
