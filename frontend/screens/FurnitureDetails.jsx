import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { supabase } from "../src/lib/supabase";

const FurnitureDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [sofa, setSofa] = useState(null);
  const [similarSofas, setSimilarSofas] = useState([]);

  useEffect(() => {
    const fetchSofa = async () => {
      const { data: sofa } = await supabase
        .from("furniture")
        .select("*")
        .eq("id", item.id)
        .single();

      if (sofa) {
        setSofa(sofa);
      }
    };
    fetchSofa();
  }, [item.id]);

  useEffect(() => {
    if (!item?.embedding) {
      return;
    }

    const fetchSimilarSofas = async () => {
      const { data } = await supabase.rpc("match_furniture", {
        query_embedding: item.embedding,
        match_threshold: 0.78,
        match_count: 10,
      });
      setSimilarSofas(data || []);
    };

    fetchSimilarSofas();
  }, [item?.embedding]);

  if (!sofa) {
    return <ActivityIndicator />;
  }

  const renderSimilarSofaItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FurnitureDetails", { item })}
    >
      <View style={styles.similarItemContainer}>
        <Image
          source={{ uri: item.photo_url }}
          style={styles.similarItemImage}
        />
        <View style={styles.similarItemDetails}>
          <Text style={styles.similarItemTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.similarItemPrice}>$ {item.price}</Text>
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
      <Image source={{ uri: item.photo_url }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {item.name.split(" ").slice(0, 2).join(" ").replace(/,$/, "")}
          </Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Contact", { email: item.email, name: item.name })
            }
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle}>Contact</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView
          style={{marginBottom:100 }}
        >
          <Text style={styles.similar}>Similar products</Text>
          <FlatList
            data={similarSofas}
            renderItem={renderSimilarSofaItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default FurnitureDetails;

const styles = StyleSheet.create({
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
    fontSize: SIZES.medium,
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
    fontSize: SIZES.medium,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  similar: {
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
