const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = "cswithrajnath/others";
        let resourceType = "raw";

        // Decide folder based on file type
        if (file.mimetype === "application/pdf") {
            folder = "cswithrajnath/pdfs";
        }

        if (
            file.mimetype === "application/zip" ||
            file.mimetype === "application/x-zip-compressed"
        ) {
            folder = "cswithrajnath/zips";
        }

        return {
            resource_type: "raw",
            upload_preset: "public_raw",
            public_id: `${Date.now()}-${file.originalname}`
        };
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB limit
    }
});

module.exports = upload;
