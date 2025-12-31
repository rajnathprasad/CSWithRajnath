const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const connectDB = require("./config/db");

const publicRoutes = require("./routes/publicRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Connect DB
connectDB();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===== SESSION SETUP =====
app.use(
    session({
        secret: "cswithrajnath_admin_secret",
        resave: false,
        saveUninitialized: false
    })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
