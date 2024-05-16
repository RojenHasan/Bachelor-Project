import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const furniture = require("../assets/images/products/furniture.jpg");
const book = require("../assets/images/products/book.jpg");
const cd = require("../assets/images/products/cd.jpg");
const car = require("../assets/images/products/car.jpg");
const house = require("../assets/images/products/house.jpg");

const Category = ({ navigation }) => {
  const categories = [
    { name: "Furniture", photo: furniture },
    { name: "Books", photo: book },
    { name: "Movies", photo: cd },
    { name: "Houses", photo: house },
    { name: "Cars", photo: car },
  ];

  const handleCategoryPress = (categoryName) => {
    navigation.navigate(`${categoryName.replace(/\s+/g, "")}Category`);
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

export default Category;
