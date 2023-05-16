const express = require("express");
const router = express.Router();
const orderModel = require("../Models/orderModel");

const { auth,isAdmin,isUser } = require("../Middleware/auth");
const {addOrder, updateOrder, getAllOrders, getByID, deleteById, updateOrderByAdmin} = require("../Controllers/ordersControl");


router.use(auth);
// add order
router.post("/", isUser, addOrder);
// update order
router.patch("/update/:id", isUser, updateOrder);
// update order 
router.patch("/updateAdmin/:id", isAdmin, updateOrderByAdmin);
// get by id
router.get("/:id", getByID);
// get all orders
router.get("/", isAdmin, getAllOrders);
// delete order by id
router.delete("/:id", isUser, deleteById);

module.exports = router;
