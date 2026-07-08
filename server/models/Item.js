import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Lost", "Found"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    contact: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;