const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
    {
        number: {
            type: String, // "11" or "12"
            required: true,
            unique: true
        },
        name: {
            type: String, // "Class 11 Computer Science"
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Class", classSchema);
