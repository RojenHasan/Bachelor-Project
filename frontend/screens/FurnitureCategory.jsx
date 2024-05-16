import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

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
            <Image source={category.photo} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the top of the container
    paddingTop: 50, // Add padding from the top
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: {
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10, // Add some horizontal margin for spacing between categories
  },
  categoryImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
  },
});

export default FurnitureCategory;
