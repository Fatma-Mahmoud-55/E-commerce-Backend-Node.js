const router = require("express").Router();
const cartControl= require("../Controllers/cartControl")
const { isUser, isAdmin } = require("../Middleware/auth");

// ADD TO CART
router.post("/", isUser,cartControl.addToCart);

// edit
router.put("/update/:id", isUser, cartControl.updateQuantity);

// get
router.get("/", isUser, cartControl.getCart);

// GET CART BY USER ID
router.get("/:id", isAdmin,cartControl.getCartByUserID);


// DELETE CART
router.delete("/:id", isUser,cartControl.deleteFromCart);


module.exports = router;