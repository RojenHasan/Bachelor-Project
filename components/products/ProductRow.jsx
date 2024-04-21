import React from 'react';
import { View,Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../constants'
import ProductCardView from './ProductCardView';
import { Feather, Ionicons } from "@expo/vector-icons";
const ProductRow =() => {
    const products= [1,2,3,4,5,6];
  return (
    <View style= {styles.container}>
     <FlatList
      data= {products}
      renderItem={({item}) => <ProductCardView/>} 
      horizontal
      contentContainerStyle= {{columnGap: SIZES.medium}}
      />

    </View>
  );
};



export default ProductRow; 