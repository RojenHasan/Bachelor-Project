import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import { useTranslation } from "react-i18next";
import "../../src/i18n/i18n.config";

const welcomeImage = require("../../assets/images/friends.png");
const welcomeImage1 = require("../../assets/images/welcome1.jpg");
const welcomeImage2 = require("../../assets/images/welcome2.jpg");
const Carousel = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const slides = [welcomeImage, welcomeImage1, welcomeImage2];
  return (
    <View>
      <View style={styles.carouselContainer}>
        <SliderBox
          images={slides}
          dotColor={COLORS.primary}
          inactiveDotColor={COLORS.secondary}
          ImageComponentStyle={{
            borderRadius: 15,
            width: "92%",
            marginTop: 15,
          }}
          circleLoop
        />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("new-furniture")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("NewFurniture")}>
            <Ionicons name="grid-outline" size={40} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Carousel;
const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    marginTop: SIZES.large,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
  },
});
