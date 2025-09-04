import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, },
  time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
  date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
});

// Check if the model exists before defining it
export const user = mongoose.models.subscribe || mongoose.model("subscribe", userSchema);
