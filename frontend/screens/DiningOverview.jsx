import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { supabase } from "../src/lib/supabase";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const DiningOverview = () => {
  const [dinings, setDinings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDinings = async () => {
      let { data: dinings, error } = await supabase
        .from("furniture")
        .select("*")
        .ilike("type", "%Kitchen%", { raw: true });

      console.log(error);
      if (dinings) {
        setDinings(dinings);
      }
    };
    fetchDinings();
  }, []);

  const goToFurnitureDetails = (item) => {
    navigation.navigate("FurnitureDetails", { item });
  };
  const renderDiningItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToFurnitureDetails(item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.photo_url }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.details}
          </Text>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons
            name="information-circle-outline"
            size={45}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={dinings}
          renderItem={renderDiningItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default DiningOverview;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    elevation: 2,
    position: "relative",
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginRight: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  supplier: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
});
