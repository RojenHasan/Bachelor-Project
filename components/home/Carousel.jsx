import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";

const welcomeImage = require("../../assets/images/welcome.jpg");
const welcomeImage1 = require("../../assets/images/welcome1.jpg");
const welcomeImage2 = require("../../assets/images/welcome2.jpg");
const Carousel = () => {
  const slides = [
    welcomeImage,
    welcomeImage1,
    welcomeImage2
    ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: "92%", marginTop: 15 }}
        // autoplay
        circleLoop
      />
    </View>
  );
};
export default Carousel;
const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});
