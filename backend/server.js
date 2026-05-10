/**
 * BFHL Backend Server
 * Candidate: Devang Sharma
 * Email: devangsharma230467@acropolis.in
 * Roll Number: DEVANG230467
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bfhlRoutes = require("./routes/bfhl");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/bfhl", bfhlRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "BFHL API is running",
    candidate: "Devang Sharma",
    roll_number: "DEVANG230467",
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ is_success: false, message: "Route not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ is_success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ BFHL Server running on port ${PORT}`);
});
