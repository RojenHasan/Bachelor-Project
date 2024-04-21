import React from 'react';
import { View,Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './headlings.style';
import {Ionicons} from "@expo/vector-icons"
import {COLORS} from '../../constants'
const Headings =() => {
  return (
    <View style= {styles.container}>
      <View style= {styles.header}>
        <Text style= {styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity>
          <Ionicons 
          name= 'apps-outline' 
          size={24} 
          color= {COLORS.primary}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};



export default Headings;