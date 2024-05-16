import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, SafeAreaView } from "react-native";
import { supabase } from "../src/lib/supabase";
import SofaItem from "../components/SofaItem";
import { StatusBar } from "expo-status-bar";
const SofasOverview = () => {
  const [sofas, setSofas] = useState([]);

  useEffect(() => {
    const fetchSofas = async () => {
      let { data: sofas, error } = await supabase.from("sofas").select("*");

      console.log(error);
      //console.log(sofas);
      if (sofas) {
        setSofas(sofas);
      }
    };
    fetchSofas();
  }, []);
  return (
    <View>
      <SafeAreaView>
        <FlatList data={sofas} renderItem={SofaItem} />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default SofasOverview;
