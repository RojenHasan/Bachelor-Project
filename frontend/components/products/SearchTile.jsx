import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./searchTile.style";
import { useNavigation } from "@react-navigation/native";

const SearchTile = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetails", { item })}
      >
        <View style={styles.image}>
          <Image source={{ uri: item.photo_url }} style={styles.productImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}> {item.name}</Text>
          <Text style={styles.supplier}> {item.price}</Text>
          <Text style={styles.supplier}> {item.type}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default SearchTile;
