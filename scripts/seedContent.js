require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Content = require("../models/content");

const seedContent = async () => {
    try {
        await connectDB();

        // Clear existing content
        await Content.deleteMany();

        const contents = [
            // ===== CLASS 11 - LECTURES =====
            {
                classNumber: "11",
                sectionSlug: "lectures",
                title: "Introduction to Computer System",
                description: "Basics of computer system for Class 11",
                contentType: "video",
                videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_1",
                order: 1
            },
            {
                classNumber: "11",
                sectionSlug: "lectures",
                title: "Data Representation",
                description: "Binary, decimal, hexadecimal systems",
                contentType: "video",
                videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_2",
                order: 2
            },

            // ===== CLASS 11 - NOTES =====
            {
                classNumber: "11",
                sectionSlug: "notes",
                title: "Computer System Notes",
                description: "Detailed notes PDF",
                contentType: "pdf",
                fileUrl: "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
                order: 1
            },

            // ===== CLASS 12 - QUICK REVISION =====
            {
                classNumber: "12",
                sectionSlug: "quick-revision",
                title: "SQL One Shot Revision",
                description: "Quick SQL revision for boards",
                contentType: "video",
                videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_3",
                order: 1
            },

            // ===== CLASS 12 - NOTES =====
            {
                classNumber: "12",
                sectionSlug: "notes",
                title: "SQL Notes",
                description: "Chapterwise SQL notes",
                contentType: "pdf",
                fileUrl: "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
                order: 1
            }
        ];

        await Content.insertMany(contents);

        console.log("✅ Content seeded successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Content seeding failed:", error);
        process.exit(1);
    }
};

seedContent();
