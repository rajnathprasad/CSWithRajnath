const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "cswithrajnath/zips",
            resource_type: "raw",
            public_id: Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
        };
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

module.exports = upload;
