const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        classNumber: {
            type: String, // "11" or "12"
            required: true
        },
        title: {
            type: String, // e.g. "Chapterwise Lectures"
            required: true
        },
        slug: {
            type: String, // e.g. "lectures", "notes"
            required: true
        },
        type: {
            type: String,
            enum: ["video", "pdf", "project"],
            required: true
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Section", sectionSchema);
