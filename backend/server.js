// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Expense from "./models/Expenses.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// --------------------------- POST --------------------------- //
app.post("/expenses", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || title.length < 3) {
      return res.status(400).json({ error: "Title must be at least 3 characters long" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }

    const dateTime = date || new Date().toISOString().slice(0, 19).replace("T", " ");
    const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d+)?(Z|[+-][01]\d:[0-5]\d)?$/;
    if (!dateTimeRegex.test(dateTime)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const doc = new Expense({ title, amount, category, date: dateTime });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- GET --------------------------- //
app.get("/expenses", async (req, res) => {
  try {
    const docs = await Expense.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- PATCH --------------------------- //
app.patch("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    if (title && title.length < 3) {
      return res.status(400).json({ error: "Title must be at least 3 characters long" });
    }

    if (amount && amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }

    if (date) {
      const dateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d+)?(Z|[+-][01]\d:[0-5]\d)?$/;
      if (!dateTimeRegex.test(date)) {
        return res.status(400).json({ error: "Invalid date format" });
      }
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, amount, category, date },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------- DELETE --------------------------- //
app.delete("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));