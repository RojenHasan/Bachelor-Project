import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

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
    justifyContent: "center",
    alignItems: "center",
  },
  //   container: {
  //     width: 182,
  //     height: 240,
  //     marginEnd: 22,
  //     borderRadius: SIZES.medium,
  //     backgroundColor: COLORS.secondary,
  //   },
  //   imageContainer: {
  //     flex: 1,
  //     width: 170,
  //     marginLeft: SIZES.small / 2,
  //     marginTop: SIZES.small / 2,
  //     borderRadius: SIZES.small,
  //     overflow: "hidden",
  //   },
  //   image: {
  //     aspectRatio: 1,
  //     resizeMode: "cover",
  //   },
  //   details: {
  //     padding: SIZES.small,
  //   },
  //   title: {
  //     fontFamily: "bold",
  //     fontSize: SIZES.large,
  //     marginBottom: 2,
  //   },
  //   supplier: {
  //     fontFamily: "regular",
  //     fontSize: SIZES.small,
  //     color: COLORS.gray,
  //   },
  //   price: {
  //     fontFamily: "bold",
  //     fontSize: SIZES.medium,
  //   },
  //   addBtn: {
  //     position: "absolute",
  //     bottom: SIZES.xSmall,
  //     rigth: SIZES.xSmall
  //   }
});
export default styles;
