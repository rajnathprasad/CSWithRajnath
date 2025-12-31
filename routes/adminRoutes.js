const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");
const upload = require("../middlewares/upload");

const {
    renderLogin,
    handleLogin,
    renderDashboard,
    handleLogout,
    renderAddContent,
    handleAddContent,
    renderSections,
    renderAddSection,
    handleAddSection,
    renderProjects,
    renderAddProject,
    handleAddProject
} = require("../controllers/adminController");

// ===== AUTH =====
router.get("/login", renderLogin);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

// ===== DASHBOARD =====
router.get("/dashboard", adminAuth, renderDashboard);

// ===== CONTENT MANAGEMENT =====
router.get("/content/add", adminAuth, renderAddContent);

router.post(
    "/content/add",
    adminAuth,
    upload.single("file"),
    handleAddContent
);

// ===== SECTION MANAGEMENT =====
router.get("/sections", adminAuth, renderSections);
router.get("/sections/add", adminAuth, renderAddSection);
router.post("/sections/add", adminAuth, handleAddSection);

// ===== PROJECT MANAGEMENT =====
router.get("/projects", adminAuth, renderProjects);
router.get("/projects/add", adminAuth, renderAddProject);
router.post(
    "/projects/add",
    adminAuth,
    upload.single("file"),
    handleAddProject
);

// PDF upload handled by multer → cloudinary
router.post(
    "/content/add",
    adminAuth,
    upload.single("file"),
    handleAddContent
);

module.exports = router;
