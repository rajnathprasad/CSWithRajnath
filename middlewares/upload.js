const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = "cswithrajnath/others";

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
            folder: folder,
            resource_type: "raw",
            access_mode: "public",
            public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
        };
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB limit
    },
    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            'application/pdf',
            'application/zip', 
            'application/x-zip-compressed'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and ZIP files are allowed'), false);
        }
    }
});

module.exports = upload;