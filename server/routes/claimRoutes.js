import express from "express";
import Claim from "../models/Claim.js";
import Item from "../models/Item.js";
import User from "../models/User.js";

const router = express.Router();

// Submit a claim/answer for an item
router.post("/", async (req, res) => {
  try {
    const { itemId, claimantUsername, claimantEmail, answer } = req.body;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.username === claimantUsername) {
      return res.status(400).json({ error: "You cannot claim your own item" });
    }

    const claim = await Claim.create({
      item: itemId,
      claimantUsername,
      claimantEmail,
      answer,
    });

    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Claims on items I posted (I'm the owner reviewing answers)
router.get("/received", async (req, res) => {
  try {
    const { username } = req.query;
    const myItems = await Item.find({ username }).select("_id");
    const itemIds = myItems.map((i) => i._id);

    const claims = await Claim.find({ item: { $in: itemIds } })
      .populate("item", "name status")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Claims I submitted on other people's items
router.get("/sent", async (req, res) => {
  try {
    const { username } = req.query;
    const claims = await Claim.find({ claimantUsername: username })
      .populate("item", "name status username")
      .sort({ createdAt: -1 });

    // Only reveal the poster's email once the claim is approved
    const withOwnerEmail = await Promise.all(
      claims.map(async (claim) => {
        const claimObj = claim.toObject();
        if (claim.status === "Approved" && claim.item) {
          const owner = await User.findOne({ username: claim.item.username });
          claimObj.ownerEmail = owner?.email || "";
        }
        return claimObj;
      })
    );

    res.json(withOwnerEmail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve or reject a claim
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!claim) return res.status(404).json({ error: "Claim not found" });

    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
