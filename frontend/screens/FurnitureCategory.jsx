import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FurnitureOverview from "./FurnitureOverview";
import { COLORS } from "../constants";
import Carousel from "react-native-snap-carousel";

const sofa = require("../assets/images/products/sofa.jpg");
const kids = require("../assets/images/products/kids.jpg");
const dinnig = require("../assets/images/products/dinning.jpg");
const beds = require("../assets/images/products/beds.jpg");

const FurnitureCategory = ({ navigation }) => {
  const categories = [
    { name: "Sofas", photo: sofa },
    { name: "Kids Furniture", photo: kids },
    { name: "Dining Furniture", photo: dinnig },
    { name: "Beds", photo: beds },
  ];

  const handleCategoryPress = (categoryName) => {
    navigation.navigate(`${categoryName.replace(/\s+/g, "")}Overview`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <View style={styles.rowContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Image source={category.photo} style={styles.image} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FurnitureOverview />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: COLORS.gray3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  categoryButton: {
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: COLORS.gray2,
  },
});

export default FurnitureCategory;
