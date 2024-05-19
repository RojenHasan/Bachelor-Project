import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { supabase } from "../src/lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SIZES, COLORS } from "../constants/theme";
import { FlatList } from "react-native";
import SearchTile from "../components/SearchTile";

const Search = () => {
  const [furniture, setFurniture] = useState([]);
  const [query, setQuery] = useState("");
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
  const onPress = async () => {
    const { data } = await supabase.functions.invoke("embed", {
      body: { input: query },
    });

    const { data: furniture } = await supabase.rpc("match_furniture", {
      query_embedding: data.embedding,
      match_threshold: 0.6,
      match_count: 20,
    });
    setFurniture(furniture);
    setQuery("");
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="AI: What are you looking for.."
            placeholderTextColor={"gray"}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => onPress()}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {query.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../frontend/assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={furniture}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

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
});
