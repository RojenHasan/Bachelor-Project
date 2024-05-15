import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button,
  Alert,
  Platform,
} from "react-native";

import Input from "../components/auth/input";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/auth/BackButton";
import { COLORS, SIZES } from "../constants";
import SharedButton from "../components/auth/Button";

const AddProduct = () => {
  console.log("Initial selectedImage state:", selectedImage);
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const openImageLibrary = async () => {
    console.log("openImageLibrary function called");
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Camera roll permissions not granted");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("ImagePicker Result:", result);
      console.log("Selected image URI:", result.uri);

      if (!result.cancelled) {
        console.log("Selected image URI:", result.uri);
        setSelectedImage(result.uri);
        console.log("selectedImage after setting:", selectedImage); // Log selectedImage after setting it
      } else {
        console.log("Image selection canceled");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("Error selecting image. Please try again.");
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!selectedImage) {
        console.log("No image selected");

        throw new Error("Please select an image for the product.");
      }

      const formData = new FormData();
      formData.append("image", {
        name: new Date().toISOString() + "_product",
        type: "image/jpg",
        uri: selectedImage,
      });
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);

      const response = await fetch("http://192.168.1.32:3000/api/products/", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added successfully:", data);
      navigation.navigate("Home"); // Navigate to the product list screen
    } catch (error) {
      console.error("Error adding product:", error.message);
      Alert.alert("Error", "Failed to add product. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <KeyboardAvoidingView>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Image
              source={require("../assets/images/bk.png")}
              style={styles.img}
            />
            <Text style={styles.motto}>Add a Product</Text>

            <Input
              placeholder="Product Title"
              icon="tag-outline"
              label={"Title"}
              onChangeText={(text) => setTitle(text)}
            />
            <Input
              placeholder="Price"
              icon="currency-usd"
              label={"Price"}
              onChangeText={(text) => setPrice(text)}
              keyboardType="numeric"
            />

            <Input
              placeholder="Description"
              icon="text-box-outline"
              label={"Description"}
              onChangeText={(text) => setDescription(text)}
              multiline
            />
            <Text> {selectedImage} </Text>
            <Button title="Choose Image" onPress={openImageLibrary} />
            {selectedImage && <Image source={{ uri: selectedImage }} />}

            <SharedButton
              style={styles.button}
              title={"Add Product"}
              onPress={handleAddProduct}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  scroll: {
    //paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: SIZES.xxLarge,
  },
  inputView: {
    marginHorizontal: 20,
  },
  registered: {
    marginTop: 10,
    color: COLORS.black,
    textAlign: "center",
  },
  img: {
    height: SIZES.height / 3,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },

  motto: {
    marginBottom: 20,
    fontFamily: "bold",
    textAlign: "center",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  button: {
    marginBottom: SIZES.xxl,
  },
});

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Image,
//   Button,
//   Alert,
// } from "react-native";
// import Input from "../components/auth/input";
// import * as ImagePicker from "expo-image-picker";
// import { SafeAreaView } from "react-native-safe-area-context";
// import BackButton from "../components/auth/BackButton";
// import { COLORS, SIZES } from "../constants";
// import SharedButton from "../components/auth/Button";

// const AddProduct = ({ navigation }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");

//   const openImageLibrary = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== "granted") {
//         throw new Error("Camera roll permissions not granted");
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       console.log("ImagePicker Result:", result);

//       if (!result.cancelled) {
//         setSelectedImage(result.uri);
//       } else {
//         console.log("Image selection canceled");
//       }
//     } catch (error) {
//       console.error("Error selecting image:", error);
//       alert("Error selecting image. Please try again.");
//     }
//   };

//   const handleAddProduct = async () => {
//     try {
//       if (!selectedImage) {
//         throw new Error("Please select an image for the product.");
//       }

//       const formData = new FormData();
//       formData.append("image", {
//         name: new Date() + "_product",
//         type: "image/jpg",
//         uri: selectedImage,
//       });
//       formData.append("title", title);
//       formData.append("price", price);
//       formData.append("description", description);

//       const response = await fetch("YOUR_BACKEND_URL/api/products", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add product");
//       }

//       const data = await response.json();
//       console.log("Product added successfully:", data);
//       navigation.navigate("Home"); // Navigate to the product list screen
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//       Alert.alert("Error", "Failed to add product. Please try again later.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
//       <SafeAreaView style={{ marginHorizontal: 20 }}>
//         <KeyboardAvoidingView>
//           <View>
//             <BackButton onPress={() => navigation.goBack()} />
//             <Image
//               source={require("../assets/images/bk.png")}
//               style={styles.img}
//             />
//             <Text style={styles.motto}>Add a Product</Text>

//             <Input
//               placeholder="Product Title"
//               icon="tag-outline"
//               label={"Title"}
//               onChangeText={(text) => setTitle(text)}
//             />
//             <Input
//               placeholder="Price"
//               icon="currency-usd"
//               label={"Price"}
//               onChangeText={(text) => setPrice(text)}
//               keyboardType="numeric"
//             />

//             <Input
//               placeholder="Description"
//               icon="text-box-outline"
//               label={"Description"}
//               onChangeText={(text) => setDescription(text)}
//               multiline
//             />
//             <Text> {selectedImage} </Text>
//             {selectedImage && <Image source={{ uri: selectedImage }} />}
//             <Button title="Choose Image" onPress={openImageLibrary} />

//             <SharedButton
//               style={styles.button}
//               title={"Add Product"}
//               onPress={handleAddProduct}
//             />
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default AddProduct;

// const styles = StyleSheet.create({
//   scroll: {
//     //paddingTop: 30,
//     paddingHorizontal: 20,
//     marginBottom: SIZES.xxLarge,
//   },
//   inputView: {
//     marginHorizontal: 20,
//   },
//   registered: {
//     marginTop: 10,
//     color: COLORS.black,
//     textAlign: "center",
//   },
//   img: {
//     height: SIZES.height / 3,
//     width: SIZES.width - 60,
//     resizeMode: "contain",
//     marginBottom: SIZES.xxLarge,
//   },

//   motto: {
//     marginBottom: 20,
//     fontFamily: "bold",
//     textAlign: "center",
//     fontSize: SIZES.xLarge,
//     color: COLORS.primary,
//   },
//   button: {
//     marginBottom: SIZES.xxl,
//   },
// });
