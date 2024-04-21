import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Fontisto } from '@expo/vector-icons'
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './productCardView.style';
import image2 from '../../assets/images/image33.jpg'
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';


const ProductCardView = () => {
    const navigation = useNavigation();
  return (
   <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
    <View style={styles.container}>
       <View style={styles.imageContainer}>
        <Image
        source= {image2}
        style= {styles.image}/>
        </View> 

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}> Product </Text>
        <Text style={styles.supplier} numberOfLines={1}> Product </Text>
        <Text style={styles.price}> $21 </Text>
    </View>
    <TouchableOpacity style={styles.addBtn}>
        <Ionicons name= "add-circle" size= {35} color= {COLORS.primary}/>
    </TouchableOpacity>  
    </View>
   </TouchableOpacity> 
  );
};

export default ProductCardView;
