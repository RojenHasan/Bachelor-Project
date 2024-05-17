import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, SafeAreaView } from "react-native";
import { supabase } from "../src/lib/supabase";
import { StatusBar } from "expo-status-bar";
const FurnitureOverview = () => {
  const [furnitures, setFurniture] = useState([]);

  useEffect(() => {
    const fetchFurnitures = async () => {
      let { data: furnitures, error } = await supabase
        .from("furniture")
        .select("*");

      console.log(error);
      //console.log(furnitures);
      if (furnitures) {
        setFurniture(furnitures);
      }
    };
    fetchFurnitures();
  }, []);
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={furnitures}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.price}</Text>
              <Image
                source={{ uri: item.photo_url }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          )}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default FurnitureOverview;
