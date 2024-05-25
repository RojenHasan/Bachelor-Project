const Message = require("../models/message");
const userController = require("./userController");
const User = require("../models/User");

module.exports = {
  getMessages: async (req, res) => {
    try {
      const messages = await Message.find().populate(
        "senderId",
        "_id username"
      );
      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  SendMessage: async (req, res) => {
    try {
      const { senderId, message } = req.body;
      const user = await User.findById(senderId);
      console.log(user.username);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      const newMessage = new Message({
        senderId,
        senderName: user.username,
        message: message,
        timestamp: new Date(),
      });
      console.log(message);

      await newMessage.save();
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
