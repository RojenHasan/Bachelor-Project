import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../src/lib/supabase";
import { COLORS, SIZES } from "../constants";
const NewestFurniture = () => {
  const [furniture, setFurniture] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLatestFurniture = async () => {
      let { data: latestFurniture, error } = await supabase
        .from("furniture")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching latest furniture:", error.message);
      } else if (latestFurniture) {
        setFurniture(latestFurniture);
      }
    };

    fetchLatestFurniture();

    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "furniture",
        },
        (payload) => {
          fetchLatestFurniture();
        }
      )
      .subscribe();
  }, []);

  const navigateToDetails = (item) => {
    navigation.navigate("FurnitureDetails", { item });
  };

  if (!furniture) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigateToDetails(furniture)}>
      <View style={styles.similarItemContainer}>
        <Image
          source={{ uri: furniture.photo_url }}
          style={styles.similarItemImage}
        />
        <View style={styles.similarItemDetails}>
          <Text style={styles.similarItemTitle} numberOfLines={1}>
            {furniture.name}
          </Text>
          <Text style={styles.similarItemPrice}>$ {furniture.price}</Text>
        </View>
        <TouchableOpacity style={styles.similarItemIcon}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default NewestFurniture;

const styles = StyleSheet.create({
  header: {
    width: "100%",
  },
  Txt: (color, top) => ({
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 16,
    marginTop: top,
    color: color,
    marginHorizontal: SIZES.small,
  }),
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    width: "100%",
    height: "45%",
    resizeMode: "cover",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 10,
  },
  descriptionWrapper: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: "semibold",
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  price: {
    padding: 10,
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  similar: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  similarItemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.small,
    alignItems: "center",
    elevation: 2,
  },
  similarItemImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.medium,
    marginRight: SIZES.small,
  },
  similarItemDetails: {
    flex: 1,
    marginRight: SIZES.small,
  },
  similarItemTitle: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginBottom: SIZES.xSmall,
  },
  similarItemPrice: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  similarItemIcon: {
    padding: SIZES.small,
  },
});
