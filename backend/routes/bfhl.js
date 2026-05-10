/**
 * BFHL Route Handler
 * Candidate: Devang Sharma
 * Email: devangsharma230467@acropolis.in
 * Roll Number: DEVANG230467
 */

const express = require("express");
const router = express.Router();
const {
  generateUserId,
  extractNumbers,
  extractAlphabets,
  getHighestLowercaseAlphabet,
  checkPrimeExists,
  processFile,
} = require("../utils/helpers");

/**
 * GET /bfhl
 * Returns operation code
 */
router.get("/", (_req, res) => {
  try {
    return res.status(200).json({ operation_code: 1 });
  } catch (error) {
    console.error("GET /bfhl error:", error.message);
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

/**
 * POST /bfhl
 * Processes data array and optional Base64 file
 */
router.post("/", (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    // --- Input validation ---
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be a non-empty array.",
      });
    }

    // --- Process data ---
    const numbers = extractNumbers(data);
    const alphabets = extractAlphabets(data);
    const highestLowercase = getHighestLowercaseAlphabet(data);
    const isPrimeFound = checkPrimeExists(numbers);

    // --- Process file ---
    const fileInfo = processFile(file_b64);

    // --- Build response ---
    const response = {
      is_success: true,
      user_id: generateUserId(),
      email: process.env.USER_EMAIL || "devangsharma230467@acropolis.in",
      roll_number: process.env.ROLL_NUMBER || "DEVANG230467",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
      is_prime_found: isPrimeFound,
      file_valid: fileInfo.file_valid,
      file_mime_type: fileInfo.file_mime_type,
      file_size_kb: fileInfo.file_size_kb,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("POST /bfhl error:", error.message);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
