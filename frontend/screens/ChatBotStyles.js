import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 2,
  },
  messageContent: {
    flex: 1,
  },
  message: {
    flexDirection: "row",
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  botMessage: {
    backgroundColor: "#e5e5ea",
    flexDirection: "row",
    alignItems: "center",
  },
  userMessage: {
    backgroundColor: "#ACBAB0",
    color: COLORS.white,
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
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.lightWhite,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    marginBottom: 10,
    borderWidth: 1, // Adding border width
    borderColor: COLORS.primary,
  },

  optionText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  productsContainer: {
    marginVertical: 10,
  },
  titleContainer: {
    backgroundColor: COLORS.primary,
    padding: 25,
    alignItems: "center",
  },
  titleText: {
    marginTop: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
