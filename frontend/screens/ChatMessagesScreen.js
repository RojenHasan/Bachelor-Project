import React, { useState, useEffect } from "react";
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
  const [userData, setUserData] = useState(null);

  const socket = io(API_URL);

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

    socket.connect();

    socket.on("newMessage", (message) => {
      console.log("Received new message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(`${API_URL}/messages`, {
        senderId: userId,
        messageType: "text",
        messageText: newMessage,
      });

      if (response.status === 200) {
        const newMessageData = {
          id: response.data.id,
          senderId: userId,
          message: newMessage,
        };
        setMessages((prevMessages) => [...prevMessages, newMessageData]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
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
        <Text style={styles.sender}>{item.senderId}:</Text>
        <Text style={styles.text}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingVertical: 10 }}
        ListEmptyComponent={<Text>No messages</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
    marginBottom: 80,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatMessagesScreen;
