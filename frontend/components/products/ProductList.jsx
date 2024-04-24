import { SafeAreaView, FlatList, View, ActivityIndicator } from "react-native";
import styles from "./productList.style";
import { COLORS } from "../../constants";
import useFetch from "../../hook/useFetch";
import { SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
const ProductList = () => {
  const { data, isLoading, error } = useFetch();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xLarge} color={COLORS.primary} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data = {data} 
      numColumns={2}
      renderItem={(item)=> <ProductCardView item={item}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent= {()=> <View style={styles.separator}/> } />}/>
    </SafeAreaView>
  )
};

export default ProductList;
