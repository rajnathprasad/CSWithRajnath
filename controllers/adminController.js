const Content = require("../models/Content");
const Section = require("../models/Section");
const Project = require("../models/Project");

//AUTH

exports.renderLogin = (req, res) => {
    res.render("admin/login", {
        title: "Admin Login | CSWithRajnath",
        error: null
    });
};

exports.handleLogin = (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        req.session.isAdmin = true;
        return res.redirect("/admin/dashboard");
    }

    res.render("admin/login", {
        title: "Admin Login | CSWithRajnath",
        error: "Invalid email or password"
    });
};

exports.handleLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login");
    });
};

//DASHBOARD

exports.renderDashboard = (req, res) => {
    res.render("admin/dashboard", {
        title: "Admin Dashboard | CSWithRajnath"
    });
};

//CONTENT

exports.renderAddContent = (req, res) => {
    res.render("admin/addContent", {
        title: "Add Content | CSWithRajnath",
        error: null
    });
};

exports.handleAddContent = async (req, res) => {
    try {
        const {
            classNumber,
            sectionSlug,
            title,
            description,
            contentType,
            videoUrl,
            order
        } = req.body;

        let fileUrl = null;
        if (req.file) fileUrl = req.file.path;

        if (!classNumber || !sectionSlug || !title || !contentType) {
            return res.render("admin/addContent", {
                title: "Add Content | CSWithRajnath",
                error: "Please fill all required fields"
            });
        }

        if (contentType === "video" && !videoUrl) {
            return res.render("admin/addContent", {
                title: "Add Content | CSWithRajnath",
                error: "Video URL is required"
            });
        }

        if (contentType === "pdf" && !fileUrl) {
            return res.render("admin/addContent", {
                title: "Add Content | CSWithRajnath",
                error: "PDF file is required"
            });
        }

        await Content.create({
            classNumber,
            sectionSlug,
            title,
            description,
            contentType,
            videoUrl: contentType === "video" ? videoUrl : null,
            fileUrl: contentType === "pdf" ? fileUrl : null,
            order: order || 0
        });

        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error(err);
        res.render("admin/addContent", {
            title: "Add Content | CSWithRajnath",
            error: "Something went wrong"
        });
    }
};

//SECTIONS

exports.renderSections = async (req, res) => {
    const sections = await Section.find().sort({ classNumber: 1 });
    res.render("admin/sections", {
        title: "Manage Sections | CSWithRajnath",
        sections
    });
};

exports.renderAddSection = (req, res) => {
    res.render("admin/addSection", {
        title: "Add Section | CSWithRajnath",
        error: null
    });
};

exports.handleAddSection = async (req, res) => {
    const { classNumber, title, slug, type, description } = req.body;

    if (!classNumber || !title || !slug || !type) {
        return res.render("admin/addSection", {
            title: "Add Section | CSWithRajnath",
            error: "Please fill all required fields"
        });
    }

    const exists = await Section.findOne({ classNumber, slug });
    if (exists) {
        return res.render("admin/addSection", {
            title: "Add Section | CSWithRajnath",
            error: "Section already exists for this class"
        });
    }

    await Section.create({
        classNumber,
        title,
        slug,
        type,
        description
    });

    res.redirect("/admin/sections");
};

//PROJECTS

// List all projects
exports.renderProjects = async (req, res) => {
    const projects = await Project.find().sort({ order: 1 });
    res.render("admin/projects", {
        title: "Manage Projects | CSWithRajnath",
        projects
    });
};

// Render add project form
exports.renderAddProject = (req, res) => {
    res.render("admin/addProject", {
        title: "Add Project | CSWithRajnath",
        error: null
    });
};

// Handle add project POST
exports.handleAddProject = async (req, res) => {
    try {
        const { title, videoUrl, order } = req.body;

        if (!title || !videoUrl || !req.file) {
            return res.render("admin/addProject", {
                title: "Add Project | CSWithRajnath",
                error: "All fields are required"
            });
        }

        await Project.create({
            title,
            videoUrl,
            zipUrl: req.file.path, // Cloudinary URL
            order: order || 0
        });

        res.redirect("/admin/projects");
    } catch (err) {
        console.error(err);
        res.render("admin/addProject", {
            title: "Add Project | CSWithRajnath",
            error: "Something went wrong"
        });
    }
};
