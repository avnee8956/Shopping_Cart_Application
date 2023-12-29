// Customer model
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: { type: String, unique: true }, // Use email as a unique field
  name: String,
  // other fields
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
