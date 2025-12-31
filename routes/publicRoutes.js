const express = require("express");
const router = express.Router();

const {
    renderHome,
    renderClassPage,
    renderSectionPage
} = require("../controllers/publicController");

// Homepage
router.get("/", renderHome);

// Class page
router.get("/class/:classNumber", renderClassPage);

// Section page
router.get("/class/:classNumber/:section", renderSectionPage);

module.exports = router;
