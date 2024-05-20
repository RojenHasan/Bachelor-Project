import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { supabase } from "../src/lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants/theme";
import SearchTile from "../components/SearchTile";

const BasicSearch = () => {
  const [furniture, setFurniture] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredFurniture, setFilteredFurniture] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

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
          setFilteredFurniture(furniture);
        }
      } catch (error) {
        console.error("Error in fetchFurniture:", error.message);
      }
    };

    fetchFurniture();
  }, []);

  useEffect(() => {
    const filteredData = furniture
      .filter((item) => {
        const words = query.toLowerCase().split(" ");
        return words.every(
          (word) =>
            item.name.toLowerCase().includes(word) ||
            item.type.toLowerCase().includes(word)
        );
      })
      .sort((a, b) =>
        sortOrder === "desc" ? b.price - a.price : a.price - b.price
      );

    setFilteredFurniture(filteredData);
  }, [query, furniture, sortOrder]);
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="What are you looking for..."
            placeholderTextColor={"gray"}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
        <View style={styles.sortButtonContent}>
          <Feather
            name={
              sortOrder === "desc" ? "arrow-down-circle" : "arrow-up-circle"
            }
            size={30}
            color={COLORS.primary}
          />
          <Text style={styles.sortButtonText}>
            {sortOrder === "desc" ? "Price: High to Low" : "Price: Low to High"}
          </Text>
        </View>
      </TouchableOpacity>
      {query.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../frontend/assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={filteredFurniture}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default BasicSearch;

const styles = StyleSheet.create({
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
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  searchImage: {
    resizeMode: "contain",
    width: SIZES.width - 100,
    height: SIZES.height - 300,
    opacity: 0.9,
  },
  sortButton: {
    alignSelf: "flex-start",
    marginHorizontal: SIZES.small,
    marginVertical: SIZES.small,
    backgroundColor: COLORS.orange,
    borderRadius: SIZES.medium,
    padding: 6,
  },
  sortButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonText: {
    marginLeft: SIZES.small,
    marginRight: SIZES.small,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});
