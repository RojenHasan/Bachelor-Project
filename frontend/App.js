import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  Cart,
  ProductDetails,
  NewRivals,
  LoginPage,
  Favorites,
  Orders,
  Signup,
} from "./screens";
import ChatBot from "./screens/ChatBot";
import SofasOverview from "./screens/SofasOverview";
import KidsFurnitureOverview from "./screens/KidsFurniture";
import DiningFurnitureOverview from "./screens/DiningFurniture";
import BedsOverview from "./screens/BedsOverview";
import FurnitureCategory from "./screens/FurnitureCategory";
import SofaDetails from "./screens/SofaDetails";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductList"
          component={NewRivals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatBot"
          component={ChatBot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FurnitureCategory"
          component={FurnitureCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SofasOverview"
          component={SofasOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SofaDetails"
          component={SofaDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KidsFurnitureOverview"
          component={KidsFurnitureOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiningFurnitureOverview"
          component={DiningFurnitureOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BedsOverview"
          component={BedsOverview}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
