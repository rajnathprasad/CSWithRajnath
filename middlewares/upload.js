const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        upload_preset: "public_raw", 
        resource_type: "raw"
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB limit
    }
});

module.exports = upload;