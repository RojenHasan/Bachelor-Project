import { View, Text } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const rojin = "";

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();

      const keywords = ["recipe", "food", "diet", "fruit"];
      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I am a Barbie. Als digitale assistent beantwoord ik uw vrage. Hoe kan ik u vandaag helpen?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Furniture Bot",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        return;
      }
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        {
          prompt: `Get me a recipe for ${messageText}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${rojin}`,
          },
        }
      );
      console.log(response.data);

      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Furniture Bot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {}
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Furniture Bot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatBot;
