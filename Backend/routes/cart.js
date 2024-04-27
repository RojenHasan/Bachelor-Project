const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get("/find/:id", cartController.getCart);

router.post("/", cartController.addToCart);

router.post("/quantity", cartController.decrementCartItem);

router.delete("/:cartItem", cartController.deleteCartItem);

router.delete("/:id", cartController.resetCart);

module.exports = router
