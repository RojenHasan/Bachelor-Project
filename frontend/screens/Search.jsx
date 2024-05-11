import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SIZES, COLORS } from "../constants/theme";
import styles from "./search.style";
import axios from "axios";
import { FlatList } from "react-native";
import SearchTile from "../components/products/SearchTile";
const Search = () => {
  const [searchKey, setSeachKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handelSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.32:3000/api/products/search/${searchKey}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.log("failed to get products ", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSeachKey}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handelSearch()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../frontend/assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

/*
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SIZES, COLORS } from "../constants/theme";
import styles from "./search.style";
import axios from "axios";
import { FlatList } from "react-native";
import SearchTile from "../components/products/SearchTile";
import Voice from "@react-native-voice/voice";

const Search = () => {
  const [searchKey, setSeachKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [recordResult, setRecordResult] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = (err) => setError(err.error);
  Voice.onSpeechResults = (result) => setRecordResult(result.value[0]);

  const startRecording = async () => {
    try {
      if (Voice) {
        // Check if Voice object exists
        await Voice.start("en-US");
        setIsRecording(true);
      } else {
        console.log("Voice object is not available");
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const stopRecording = async () => {
    try {
      if (Voice) {
        // Check if Voice object exists
        await Voice.stop();
        setIsRecording(false);
      } else {
        console.log("Voice object is not available");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handelSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.32:3000/api/products/search/${searchKey}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.log("failed to get products ", error);
    }
  };
  return (
    <SafeAreaView>
      {error && <Text>{error.toString()}</Text>}
      <Text>{recordResult}</Text>

      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <Text>{isRecording ? "stop recording" : "start recording"}</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSeachKey}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handelSearch()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../frontend/assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
 */
