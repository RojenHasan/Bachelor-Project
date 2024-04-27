const router = require("express").Router();
const userController = require("../controllers/userController");

// UPADATE USER
router.put("/:id", userController.updateUser);

// DELETE USER

router.delete("/:id", userController.deleteUser);

// GET USER

router.get("/:id", userController.getUser);

module.exports = router;
