import Item from "../models/Item.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export async function createItem(req, res) {
  try {
    const { name, category, status, description, location, color, brand, contact, username } = req.body;

    if (!name || !category || !status || !description || !location || !color || !username) {
      return res.status(400).json({ error: "Please fill out all required fields." });
    }

    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    const item = await Item.create({
      name,
      category,
      status,
      description,
      imageUrl,
      location,
      color,
      brand: brand || "",
      contact: contact || "",
      username,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Create item error:", error);
    res.status(500).json({ error: error.message || "Failed to create item" });
  }
}

export async function getItems(_req, res) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch items" });
  }
}
