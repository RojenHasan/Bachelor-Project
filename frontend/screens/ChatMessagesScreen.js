import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants";

const API_URL = "http://192.168.1.32:3000/api";

const ChatMessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const socket = useRef(io(API_URL)); // Use useRef for socket instance

  const flatListRef = useRef(null); // Ref for FlatList

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
        scrollToBottom(); // Scroll to bottom after sending message
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
    const isCurrentUser = item.senderId === userId;

    return (
      <View
        key={item._id || index.toString()}
        style={[
          styles.message,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        <Text style={styles.sender}>{item.senderName}: </Text>
        <Text style={styles.text}>{item.message}</Text>
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
          onContentSizeChange={scrollToBottom} // Scroll to bottom on content size change (new messages)
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
          />
          <Button title="Send" onPress={sendMessage} color={COLORS.primary} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9CA5A6",
    marginHorizontal: 3,
    marginBottom: 35,
    marginTop: 15,
  },
  message: {
    maxWidth: "80%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  currentUserMessage: {
    backgroundColor: "#dcf8c6",
  },
  otherUserMessage: {
    backgroundColor: "#ffffff",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 18,
    color: COLORS.primary,
  },
  text: {
    fontSize: 16,
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
