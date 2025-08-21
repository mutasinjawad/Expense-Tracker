// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Expense from "./models/Expenses.js";
import User from "./models/Users.js";
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// --------------------------- POST --------------------------- //
app.post("/expenses", auth, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || title.length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters long" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const dateGiven = date || new Date().toISOString().split('T')[0];
    const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateTimeRegex.test(dateGiven)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const doc = new Expense({ title, amount, category, date: dateGiven, userId: req.userId });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------- GET --------------------------- //
app.get("/expenses", auth, async (req, res) => {
  try {
    const docs = await Expense.find({ userId: req.userId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------- PATCH --------------------------- //
app.patch("/expenses/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;
    console.log("Received data:", req.body);

    if (title && title.length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters long" });
    }

    if (amount && amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    if (date) {
      const onlyDate = date.split('T')[0];
      const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      if (!dateTimeRegex.test(onlyDate)) {
        return res.status(400).json({ message: "Invalid date format" });
      }
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, amount, category, date },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------- DELETE --------------------------- //
app.delete("/expenses/:id", auth, async (req, res) => {
  try {
    console.log("Called")
    const { id } = req.params;

    const deletedExpense = await Expense.findOneAndDelete({_id: id, userId: req.userId});

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User registration
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&._-]{8,}$/;
    if (!passwordStrength.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error occurred while registering user:", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("firstName lastName email -_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: 200, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User authentication
app.get("/auth", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User is authenticated" });
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));