import React from 'react';
import { View,Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './headlings.style';
import {Ionicons} from "@expo/vector-icons"
import {COLORS} from '../../constants'
import {useNavigation} from "@react-navigation/native"
const Headings =() => {
  const navigation = useNavigation();
  return (
    <View style= {styles.container}>
      <View style= {styles.header}>
        <Text style= {styles.headerTitle}>New Products</Text>
        <TouchableOpacity onPress={ ()=> navigation.navigate("ProductList")}>
          <Ionicons 
          name= 'grid-outline' 
          size={24} 
          color= {COLORS.primary}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};



export default Headings;