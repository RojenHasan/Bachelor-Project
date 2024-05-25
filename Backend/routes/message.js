const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.getMessages);
router.post("/", messageController.SendMessage);

module.exports = router;
