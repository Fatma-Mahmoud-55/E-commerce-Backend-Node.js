const express = require("express");
var router = express.Router();
const { auth, isAdmin, isUser } = require("../Middleware/auth");
router.use(auth);
// router.get("/", (req, res) => {
//   // Create a new payment button.
//   const paymentButton = paypal.createPaymentButton({
//     amount: "10.00",
//     currency: "USD",
//     environment: "sandbox",
//     clientId: "YOUR_CLIENT_ID",
//     secret: "YOUR_SECRET",
//   });

//   // Render the payment button.
//   res.render("index", { paymentButton });
// });

// router.post("/payment", (req, res) => {
//   // Handle the payment success event.
//   if (req.body.success) {
//     // Do something with the payment information.
//     res.send("Payment successful!");
//   }

//   // Handle the payment failure event.
//   if (req.body.failure) {
//     // Handle the payment failure.
//     res.send("Payment failed!");
//   }
// });
module.exports = router;
