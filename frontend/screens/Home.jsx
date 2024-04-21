import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import { Ionicons, Fontisto } from '@expo/vector-icons'
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <Ionicons name='location-outline' size={24} />
            <Text style={styles.location}>Landen</Text>

            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}> 8 </Text>
              </View>
              <TouchableOpacity>
                <Fontisto name='shopping-bag' size={24}></Fontisto>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
         <Welcome/>
         <Carousel/> 
         <Headings/>
         <ProductRow/>
         <View style={{ marginVertical: 100 }} /> 

        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;