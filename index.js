import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const receiptSchema = new mongoose.Schema({
  retailer: String,
  purchaseDate: String,
  purchaseTime: String,
  items: Array,
  total: String
});

const Receipt = mongoose.model("Receipt", receiptSchema);

const calculatePoints = (receipt) => {
  let points = 0;
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;
  if (parseFloat(receipt.total) % 1 === 0) points += 50;
  if (parseFloat(receipt.total) % 0.25 === 0) points += 25;
  points += Math.floor(receipt.items.length / 2) * 5;

  for (let item of receipt.items) {
    if (item.shortDescription && item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2);
    }
  }

  if (parseFloat(receipt.total) > 10.0) points += 5;

  let purchaseDay = parseInt(receipt.purchaseDate.split("-")[2]);
  if (purchaseDay % 2 !== 0) points += 6;

  let [hour, minute] = receipt.purchaseTime.split(":").map(Number);
  if (hour === 14 || (hour === 15 && minute >= 0)) points += 10;

  return points;
};

app.post("/receipts/process", async (req, res) => {
  try {
    const { retailer, purchaseDate, purchaseTime, items, total } = req.body;
    const newReceipt = new Receipt({ retailer, purchaseDate, purchaseTime, items, total });

    await newReceipt.save();
    res.status(201).json({ id: newReceipt._id }); // Return MongoDB ID
  } catch (error) {
    console.error("Error saving receipt:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/receipts/:id/points", async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ error: "Receipt not found" });

    const points = calculatePoints(receipt);
    res.json({ receiptId: receipt._id, points });
  } catch (error) {
    console.error("Error retrieving points:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.render("index", { title: "Receipt Processor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
