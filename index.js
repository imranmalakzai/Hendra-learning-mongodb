import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// 1. Create a schema for Users
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Only if you are storing it
});

// 2. Create a model for Users
const User = mongoose.model("User", userSchema);

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 3. Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send them as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});
