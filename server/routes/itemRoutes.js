import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

//Setter - Create Items
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Getter - Get Items
router.get("/", async (req, res) => {
  try {
    const filter = req.query.username ? { username: req.query.username } : {};
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Getter - Get all items for speficic user
router.get("/user/:username", async (req, res) => {
 
  try {
    const filter = req.params.username ? { username: req.params.username } : {};
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


});


//Getter - Get single item by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;