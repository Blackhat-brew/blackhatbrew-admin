import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email1: { type: String, required: true,   },
  message: { type: String, required: true,  },

  time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
  date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
});

export const user1 = mongoose.models.contact || mongoose.model("contact", userSchema);
