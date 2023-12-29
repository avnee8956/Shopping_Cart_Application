const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const Product = require("./models/product");
const Cart = require("./models/cart");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shopdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
    app.listen(3001, () => {
      console.log("Server is listening on port 3001");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
// Create a new customer
app.post("/customers", async (req, res) => {
    const { name, email } = req.body;
    const customer = new Customer({ name, email });
    const savedCustomer = await customer.save();
    res.json(savedCustomer);
  });
  
  // Create a new product
  app.post("/products", async (req, res) => {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    const savedProduct = await product.save();
    res.json(savedProduct);
  });
  
  // Add a product to a customer's cart
  app.post("/carts/:customerEmail/addProduct/:productId", async (req, res) => {
    const customerEmail = req.params.customerEmail;
    const productId = req.params.productId;
  
    const customer = await Customer.findOne({ email: customerEmail });
    const product = await Product.findById(productId);
  
    if (!customer || !product) {
      return res.status(404).json({ error: "Customer or product not found" });
    }
  
    const cart = await Cart.findOneAndUpdate(
      { customer_email: customerEmail }, // Corrected field name
      { $addToSet: { products: productId } },
      { upsert: true, new: true }
    );
  
    res.json(cart);
  });
  
  
  // Add this route in your index.js file
 
app.get("/customers", async (req, res) => {
  try {
    console.log(req.query);
    const customers = await Customer.find(req.query);
    res.json(customers);
    console.log(customers);
  }catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products", async (req, res) => {
    try {
        console.log(req.query);
        const products = await Product.find(req.query);
        res.json(products);
        console.log(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/carts", async (req, res) => {
  try {
      console.log(req.query);
      const cart = await Cart.find(req.query);
      res.json(cart);
      console.log(cart);
  } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});