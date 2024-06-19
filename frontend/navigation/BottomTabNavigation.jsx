import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/index";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Category from "../screens/Category";
import AddFurniture from "../screens/AddFurniture";
import Chatting from "../screens/Chatting";
import PredictPrice from "../screens/PredictPrice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    checkUserExistence();
  }, []);

  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem("id");
    if (id) {
      const userID = `user${JSON.parse(id)}`;
      try {
        const userData = await AsyncStorage.getItem(userID);
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          setUserLoggedIn(true);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      {userLoggedIn && (
        <>
          <Tab.Screen
            name="Category"
            component={Category}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={focused ? "list" : "list-outline"}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray2}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={"search-sharp"}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray2}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="AddFurniture"
            component={AddFurniture}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={focused ? "add-circle" : "add-circle-outline"}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray2}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Chatting"
            component={Chatting}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray2}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="PredictPrice"
            component={PredictPrice}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={focused ? "cash" : "cash-outline"}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray2}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={focused ? "person" : "person-outline"}
                    size={24}
                    color={focused ? COLORS.primary : COLORS.gray2}
                  />
                );
              },
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
