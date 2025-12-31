const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
    {
        classNumber: {
            type: String, // "11" or "12"
            required: true
        },
        sectionSlug: {
            type: String, // "lectures", "notes", "short-notes"
            required: true
        },
        title: {
            type: String, // Chapter name or video title
            required: true
        },
        description: {
            type: String
        },
        contentType: {
            type: String,
            enum: ["video", "pdf"],
            required: true
        },
        videoUrl: {
            type: String // YouTube embed / watch URL
        },
        fileUrl: {
            type: String // Cloudinary PDF URL
        },
        order: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Content", contentSchema);
