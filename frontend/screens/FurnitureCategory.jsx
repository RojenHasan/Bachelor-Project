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
  const renderCarouselItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.categoryButton}
        onPress={() => handleCategoryPress(item.name)}
      >
        <Image source={item.photo} style={styles.image} />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <Carousel
        data={categories}
        renderItem={renderCarouselItem}
        sliderWidth={300} // Adjust as per your design
        itemWidth={250} // Adjust as per your design
        loop={true}
        layout="default"
      />
      <View style={styles.overviewContainer}>
        <Text style={styles.heading}>Overview</Text>
        <FurnitureOverview />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  categoryButton: {
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: COLORS.gray2,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  overviewContainer: {
    flex: 1,
    marginTop: -450,
  },
});

export default FurnitureCategory;
