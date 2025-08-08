require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const atsRoutes = require("./routes/atsRoutes");

const app = express();

// -------------------- CORS SETUP --------------------
const corsOptions = {
  origin: process.env.CLIENT_URL || "https://job-fit-pro-ochre.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Apply CORS globally
app.options("*", cors(corsOptions)); // Handle preflight requests globally
// ----------------------------------------------------

// Connect Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);

// Serve uploads folder with CORS for files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set(
        "Access-Control-Allow-Origin",
        process.env.CLIENT_URL || "https://job-fit-pro-ochre.vercel.app"
      );
    },
  })
);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
