const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = "cswithrajnath/others";


        if (file.mimetype === "application/pdf") {
            folder = "cswithrajnath/pdfs";
        }

        if (
            file.mimetype === "application/zip" ||
            file.mimetype === "application/x-zip-compressed"
        ) {
            folder = "cswithrajnath/zips";
        }


        const extension = path.extname(file.originalname);
        const nameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '');

        return {
            folder: folder,
            resource_type: "raw",
            access_mode: "public",
            public_id: `${Date.now()}-${nameWithoutExtension}${extension}`, 
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