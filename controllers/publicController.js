const Section = require("../models/section");
const Content = require("../models/content");
const Project = require("../models/Project");

// Home page
exports.renderHome = (req, res) => {
    res.render("pages/home", {
        title: "CSWithRajnath | Home"
    });
};

// Class page (11 or 12)
exports.renderClassPage = async (req, res) => {
    const { classNumber } = req.params;

    try {
        const sections = await Section.find({ classNumber }).sort({ createdAt: 1 });

        res.render("pages/class", {
            title: `Class ${classNumber} | CSWithRajnath`,
            classNumber,
            sections
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// Section page
exports.renderSectionPage = async (req, res) => {
    const { classNumber, section } = req.params;

    try {
        // Projects section (special case)
        if (section === "projects") {
            const projects = await Project.find().sort({ order: 1 });

            return res.render("pages/section", {
                title: "Projects & Synopsis",
                classNumber,
                section,
                projects,
                contents: []
            });
        }

        const contents = await Content.find({
            classNumber,
            sectionSlug: section
        }).sort({ order: 1 });

        res.render("pages/section", {
            title: section.replace("-", " "),
            classNumber,
            section,
            contents,
            projects: []
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
