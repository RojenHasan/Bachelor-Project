import React from 'react';
import {TextInput, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SIZES, COLORS } from '../constants/theme';
import styles from './search.style';
const Search = () => {
  return (
    <SafeAreaView>
     <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
          name= "camera-outline"
          size= {SIZES.xLarge} 
          style={styles.searchIcon}/>
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => {}}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather 
            name="search" 
            size={24} 
            color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  );
};

export default Search;
