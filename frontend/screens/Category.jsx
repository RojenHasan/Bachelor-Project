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
      <View style={styles.gridContainer}>
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
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoryButton: {
    alignItems: "center",
    width: 150,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Category;
