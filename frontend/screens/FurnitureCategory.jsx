import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { supabase } from "../src/lib/supabase";
import { SIZES, COLORS } from "../constants/theme";
import FurnitureOverview from "./FurnitureOverview";
import Carousel from "react-native-snap-carousel";

const sofa = require("../assets/images/products/sofa.jpg");
const kids = require("../assets/images/products/kids.jpg");
const dinnig = require("../assets/images/products/dinning.jpg");
const beds = require("../assets/images/products/beds.jpg");
const outdoor = require("../assets/images/products/outdoor.jpg");

const FurnitureCategory = ({ navigation }) => {
  const [furniture, setFurniture] = useState([]);
  const categories = [
    { name: "Sofas", photo: sofa },
    { name: "Kids", photo: kids },
    { name: "Dining", photo: dinnig },
    { name: "Beds", photo: beds },
    { name: "outdoor", photo: outdoor },
  ];
  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        let { data: furniture, error } = await supabase
          .from("furniture")
          .select("*");

        if (error) {
          console.error("Error fetching furniture:", error.message);
          return;
        }

        if (furniture) {
          setFurniture(furniture);
        }
      } catch (error) {
        console.error("Error in fetchFurniture:", error.message);
      }
    };

    fetchFurniture();
  }, []);

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
      <View style={{ marginVertical: 12 }} />

      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon}></Feather>
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="AI What are you looking for"
          />
        </View>
      </View>
      <Text style={styles.heading}>Categories</Text>
      <Carousel
        data={categories}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={250}
        loop={true}
        layout="default"
      />
      <View style={styles.overviewContainer}>
        <Text style={styles.heading}></Text>
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
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 120,
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    color: "gainsboro",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 40,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});

export default FurnitureCategory;
