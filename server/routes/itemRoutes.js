import express from "express";
import upload from "../middleware/upload.js";
import { createItem, getItems } from "../controllers/itemController.js";

const router = express.Router();

router.post("/", upload.single("image"), createItem);
router.get("/", getItems);

export default router;