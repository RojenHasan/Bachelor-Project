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
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../src/lib/supabase";
import SearchTile from "../components/SearchTile";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    sendDefaultMessage();
  }, []);

  const sendDefaultMessage = () => {
    const defaultMessage =
      "Hello! How can I assist you today? You can ask about our opening hours, address, or products.";
    setMessages([{ text: defaultMessage, sender: "bot" }]);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const keywords = ["opening", "address", "product"];
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
      } else if (input.toLowerCase().includes("product")) {
        const products = await fetchMatchingProducts(input);
        setMatchedProducts(products);

        if (products.length > 0) {
          responseMessage = "Here are some products that you may like:";
        } else {
          responseMessage = "No products found.";
        }
      }

      setMessages([...newMessages, { text: responseMessage, sender: "bot" }]);
    } else {
      const helpOptionsMessage =
        "I'm sorry, I can't assist with that. How can I help you?";
      setMessages([
        ...newMessages,
        { text: helpOptionsMessage, sender: "bot" },
      ]);
      setAwaitingUserResponse(true);
    }
  };

  const fetchMatchingProducts = async (query) => {
    try {
      const { data: embedData, error: embedError } =
        await supabase.functions.invoke("embed", {
          body: { input: query },
        });

      if (embedError) {
        console.error("Error invoking embed function:", embedError.message);
        return [];
      }

      if (!embedData || !embedData.embedding) {
        console.error("Invalid embedding data received:", embedData);
        return [];
      }

      const { data: furnitureData, error: matchError } = await supabase.rpc(
        "match_furniture",
        {
          query_embedding: embedData.embedding,
          match_threshold: 0.78,
          match_count: 3,
        }
      );

      if (matchError) {
        console.error("Error fetching matching products:", matchError.message);
        return [];
      }

      return furnitureData;
    } catch (error) {
      console.error("Error in fetchMatchingProducts:", error.message);
      return [];
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

    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
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
        {matchedProducts.length > 0 && (
          <View style={styles.productsContainer}>
            {matchedProducts.map((product, index) => (
              <SearchTile key={index} item={product} />
            ))}
          </View>
        )}
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
  productsContainer: {
    marginVertical: 10,
  },
});

export default ChatBot;
