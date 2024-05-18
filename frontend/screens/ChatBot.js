import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Ionicons for icons

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);
  const scrollViewRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Keywords to check
    const keywords = ["opening", "address"];

    // Check if input contains any of the keywords
    const containsKeyword = keywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );

    if (containsKeyword) {
      let responseMessage = "";
      if (input.toLowerCase().includes("opening")) {
        responseMessage = "We are open from 8:30 to 17:30.";
      } else if (input.toLowerCase().includes("address")) {
        responseMessage =
          "We do not have a physical address, we only exist online.";
      }

      setMessages([...newMessages, { text: responseMessage, sender: "bot" }]);
    } else {
      // Handle other types of messages as needed
      // For example, prompt user for further assistance options
      const helpOptionsMessage =
        "I'm sorry, I can't assist with that. How can I help you?";
      setMessages([...newMessages, { text: helpOptionsMessage, sender: "bot" }]);
      setAwaitingUserResponse(true);
    }
  };

  const handleOptionSelect = (option) => {
    let responseMessage = "";
    switch (option) {
      case "openingHours":
        responseMessage = "We are open from 8:30 to 17:30.";
        break;
      case "contactSeller":
        responseMessage =
          "Please contact our seller support team at support@example.com.";
        break;
      case "deliveryProblem":
        responseMessage =
          "For delivery issues, please reach out to our customer service at customer_service@example.com.";
        break;
      default:
        break;
    }

    const newMessages = [...messages, { text: responseMessage, sender: "bot" }];
    setMessages(newMessages);
    setAwaitingUserResponse(false);

    // Scroll to the bottom when new message is added
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    // Initially scroll to the bottom
    scrollToBottom();
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.sender === "bot" ? styles.botMessage : styles.userMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {awaitingUserResponse && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect("openingHours")}
            >
              <Text style={styles.optionText}>Opening Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect("contactSeller")}
            >
              <Text style={styles.optionText}>Contact Seller</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect("deliveryProblem")}
            >
              <Text style={styles.optionText}>Delivery Problem</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  message: {
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  botMessage: {
    backgroundColor: "#e5e5ea",
  },
  userMessage: {
    backgroundColor: "#b2f5ea",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
  },
  optionsContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#007bff",
    marginBottom: 10,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChatBot;
