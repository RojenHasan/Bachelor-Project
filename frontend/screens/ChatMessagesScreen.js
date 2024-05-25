import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.32:3000";

const ChatMessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");

  const socket = io(API_URL);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  }, []);

  useEffect(() => {
    const checkUserExistence = async () => {
      const id = await AsyncStorage.getItem("id");
      const userID = `user${JSON.parse(id)}`;
      try {
        const userData = await AsyncStorage.getItem(userID);
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          setUserId(parsedData.id);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    checkUserExistence();
    fetchMessages();
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(`${API_URL}/messages`, {
        senderId: userId,
        messageType: "text",
        messageText: newMessage,
      });

      if (response.status === 200) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.message}>
      <Text style={styles.sender}>jjj: </Text>
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    flexDirection: "row",
    marginVertical: 5,
  },
  sender: {
    fontWeight: "bold",
  },
  text: {
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default ChatMessagesScreen;
