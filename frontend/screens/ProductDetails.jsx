import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import styles from "./productDetail.style";
import { useRoute } from "@react-navigation/native";
import axios from "axios"; // Import axios

import {
  Feather,
  Ionicons,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import image2 from "../assets/images/image33.jpg";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);

  const incremant = () => {
    setCount(count + 1);
  };
  const decremant = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const addToCart = async () => {
    try {
      const response = await axios.post("http://192.168.1.32:3000/api/carts", {
        userId: "USER_ID", // Replace with actual user ID
        cartItem: item._id, // Assuming item has an _id property
        quantity: count,
      });

      // Handle success
      console.log(response.data); // Output the response (e.g., "Product added to cart")
      Alert.alert("Success", "Product added to cart");
    } catch (error) {
      // Handle error
      console.error("Error adding product to cart:", error);
      Alert.alert("Error", "Failed to add product to cart");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => incremant()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={() => decremant()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} />
              <Text>Leuven</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text>Free Delivery</Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>Buy Now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={addToCart} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
