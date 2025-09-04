import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  description: String,
  pro: Number,
  details: String,
  backgroundImage: {
    public_id: String,
    url: String,
  },
  logo: {
    public_id: String,
    url: String,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  reviews: [{ author: String, comment: String, rating: Number }],
  githubLink: String,
  instructions: [{ platform: String, content: String,github: String }],
  time: { type: String, default: () => new Date().toLocaleTimeString() },
  date: { type: String, default: () => new Date().toLocaleDateString() },
});

// 🚩 Force remove old cached model if it exists
if (mongoose.models.project) {
  delete mongoose.models.project;
}

export const project = mongoose.model("project", projectSchema);
