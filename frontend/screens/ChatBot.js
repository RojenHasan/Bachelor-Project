import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../src/lib/supabase";
import SearchTile from "../components/SearchTile";
import questions from "../constants/questions.json";
import stringSimilarity from "string-similarity";
import { styles } from "./ChatBotStyles";
import axios from "axios";

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
    const defaultMessage1 = "Our virtual assistant is here to help you.";

    const defaultMessage2 = "Hello! How can I assist you today?";

    setMessages([
      { text: defaultMessage1, sender: "bot" },
      { text: defaultMessage2, sender: "bot", action: "options" },
    ]);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    try {
      let bestMatch = { similarity: 0, answer: "" };

      questions.forEach((q) => {
        const similarity = stringSimilarity.compareTwoStrings(
          input.toLowerCase(),
          q.question.toLowerCase()
        );

        if (similarity > bestMatch.similarity) {
          bestMatch = { similarity, answer: q.answer };
        }
        // else if (input.toLowerCase().includes("product")) {
        //   const products = await fetchMatchingProducts(input);
        //   setMatchedProducts(products);

        //   if (products.length > 0) {
        //     responseMessage = "Here are some products that you may like:";
        //   } else {
        //     responseMessage = "No products found.";
        //   }
        // }
      });

      if (bestMatch.similarity > 0.5) {
        setMessages([
          ...newMessages,
          { text: bestMatch.answer, sender: "bot" },
        ]);
      } else {
        const helpOptionsMessage =
          "I'm sorry, I can't assist with that. How can I help you?";
        setMessages([
          ...newMessages,
          { text: helpOptionsMessage, sender: "bot" },
        ]);
        setAwaitingUserResponse(true);
      }
    } catch (error) {
      console.error("Error handling message:", error.message);
      setMessages([
        ...newMessages,
        { text: "An error occurred. Please try again.", sender: "bot" },
      ]);
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
        console.error("Embed Error details:", embedError);
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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>PIVOT - ChatBot</Text>
      </View>
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
            {message.sender === "bot" && (
              <Image
                source={require("../assets/images/chatbot.jpg")}
                style={styles.avatar}
              />
            )}

            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
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

export default ChatBot;
