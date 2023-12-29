// Cart model
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customer_email: { type: String, ref: "Customer" }, // Reference customer by email
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  total: Number,
  // other fields
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
