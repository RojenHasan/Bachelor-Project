import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../constants";

const API_URL = "http://192.168.1.32:3000/api";

const ChatMessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const socket = useRef(io(API_URL));

  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (id !== null) {
          const userID = `user${JSON.parse(id)}`;
          const userData = await AsyncStorage.getItem(userID);
          if (userData !== null) {
            const parsedData = JSON.parse(userData);
            setUserId(parsedData.id);
            setUserData(parsedData);
          }
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    const fetchInitialMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
    fetchInitialMessages();

    socket.current.connect();

    socket.current.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(`${API_URL}/messages`, {
        senderId: userData,
        message: newMessage,
      });

      if (response.status === 200) {
        const newMessageData = {
          id: response.data.id,
          senderId: userData,
          senderName: userData.username,
          message: newMessage,
        };

        setMessages((prevMessages) => [...prevMessages, newMessageData]);
        setNewMessage("");
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item, index }) => {
    const isCurrentUser = item.senderId._id === userData._id;

    return (
      <View
        key={item._id || index.toString()}
        style={[
          styles.message,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        <Text
          style={[styles.textName, isCurrentUser && styles.currentUserName]}
        >
          {item.senderName}:
        </Text>
        <Text style={[styles.text, isCurrentUser && styles.currentUserText]}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
          ListEmptyComponent={<Text>No messages</Text>}
          onContentSizeChange={scrollToBottom}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.iconContainer}>
            <Ionicons name="send-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 3,
    marginBottom: 35,
    marginTop: 15,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },
  currentUserMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
  },
  otherUserMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  currentUserText: {
    color: "#fff",
  },
  currentUserName: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: SIZES.medium,
  },
  textName: {
    fontWeight: "bold",
    fontSize: SIZES.medium,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  emptyText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default ChatMessagesScreen;
