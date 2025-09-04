import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String },
    blog: { type: String },
    shortblog: { type: String },
    tags: [{ type: String }],
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    
    },    time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
    date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
});

// Check if the model exists before defining it
export const blogs = mongoose.models.blogs2 || mongoose.model("blogs2", blogSchema);
