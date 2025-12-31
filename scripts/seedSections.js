require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Section = require("../models/Section");

const seedSections = async () => {
    try {
        await connectDB();

        // Clear existing sections
        await Section.deleteMany();

        const sections = [
            // ===== CLASS 11 =====
            {
                classNumber: "11",
                title: "Chapterwise Lectures",
                slug: "lectures",
                type: "video",
                description: "Complete chapter-by-chapter video lectures"
            },
            {
                classNumber: "11",
                title: "Quick Revision Series",
                slug: "quick-revision",
                type: "video",
                description: "Fast revision for exams"
            },
            {
                classNumber: "11",
                title: "Programming Practice",
                slug: "programming-practice",
                type: "video",
                description: "Programming problems and solutions"
            },
            {
                classNumber: "11",
                title: "Notes",
                slug: "notes",
                type: "pdf",
                description: "Detailed chapterwise notes (PDF)"
            },
            {
                classNumber: "11",
                title: "Short Notes",
                slug: "short-notes",
                type: "pdf",
                description: "Quick revision short notes"
            },

            // ===== CLASS 12 =====
            {
                classNumber: "12",
                title: "Chapterwise Lectures",
                slug: "lectures",
                type: "video",
                description: "Complete chapter-by-chapter video lectures"
            },
            {
                classNumber: "12",
                title: "Quick Revision Series",
                slug: "quick-revision",
                type: "video",
                description: "Fast revision for board exams"
            },
            {
                classNumber: "12",
                title: "Programming Practice",
                slug: "programming-practice",
                type: "video",
                description: "Programming problems and practice sets"
            },
            {
                classNumber: "12",
                title: "Notes",
                slug: "notes",
                type: "pdf",
                description: "Detailed chapterwise notes (PDF)"
            },
            {
                classNumber: "12",
                title: "Short Notes",
                slug: "short-notes",
                type: "pdf",
                description: "Quick revision short notes"
            },
            {
                classNumber: "12",
                title: "Projects & Synopsis",
                slug: "projects",
                type: "project",
                description: "CBSE project guidance and downloads"
            }
        ];

        await Section.insertMany(sections);

        console.log("✅ Sections seeded successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedSections();
