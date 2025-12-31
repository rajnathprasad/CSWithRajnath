const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String, // Project name
            required: true
        },
        description: {
            type: String
        },
        videoUrl: {
            type: String, // YouTube explanation video
            required: true
        },
        zipUrl: {
            type: String, // Cloudinary ZIP download link
            required: true
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

module.exports = mongoose.model("Project", projectSchema);
