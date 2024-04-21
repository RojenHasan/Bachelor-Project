import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./productDetail.style";
import { Feather, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import image2 from "../assets/images/image33.jpg";
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
const ProductDetails = ({ navigation }) => {
  const [count, setCount] = useState(1);

  const incremant = () => {
    setCount(count + 1);
  };
  const decremant = () => {
    if (count > 1) {
      setCount(count - 1);
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
      <Image source={image2} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Product</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>660$</Text>
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
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
            turpis eget magna consectetur, nec volutpat ipsum scelerisque. Duis
            feugiat elit in ligula consequat, sed consectetur enim vestibulum.
            Ut euismod tellus nec justo malesuada, vel aliquet ipsum consequat.
            Phasellus auctor odio id libero volutpat, nec condimentum dui
            fermentum.
          </Text>
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

        <View style= {styles.cartRow}>
              <TouchableOpacity onPress={() => {}} style= {styles.cartBtn}>
                <Text >rojie habd, </Text>
              </TouchableOpacity>
        </View>
       
      </View>
    </View>
  );
};

export default ProductDetails;
