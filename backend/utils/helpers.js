/**
 * Helper utilities for BFHL API
 * Candidate: Devang Sharma
 */

const mime = require("mime-types");

/**
 * Generate user_id in format: full_name_ddmmyyyy
 */
function generateUserId() {
  const fullName = process.env.USER_FULL_NAME || "devang_sharma";
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${fullName}_${dd}${mm}${yyyy}`;
}

/**
 * Check if a number is prime
 */
function isPrime(num) {
  const n = parseInt(num, 10);
  if (isNaN(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Extract numbers from data array
 */
function extractNumbers(data) {
  return data.filter((item) => {
    if (item === null || item === undefined) return false;
    const str = String(item).trim();
    return str !== "" && !isNaN(str);
  });
}

function extractAlphabets(data) {
  return data.filter((item) => {
    if (item === null || item === undefined) return false;
    return /^[a-zA-Z]$/.test(String(item));
  });
}

function getHighestLowercaseAlphabet(data) {
  const lowercaseLetters = data.filter((item) => {
    if (item === null || item === undefined) return false;
    const s = String(item);
    return /^[a-z]$/.test(s);
  });
  if (lowercaseLetters.length === 0) return [];
  lowercaseLetters.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
  return [lowercaseLetters[0]];
}

/**
 * Check if any number in the array is prime
 */
function checkPrimeExists(numbers) {
  return numbers.some((num) => isPrime(num));
}

/**
 * Validate Base64 string and extract file info
 */
function processFile(fileB64) {
  if (!fileB64 || typeof fileB64 !== "string" || fileB64.trim() === "") {
    return {
      file_valid: false,
      file_mime_type: null,
      file_size_kb: null,
    };
  }

  try {
    // Handle data URI format: data:<mime>;base64,<data>
    let base64Data = fileB64;
    let detectedMime = null;

    if (fileB64.includes(",")) {
      const parts = fileB64.split(",");
      const header = parts[0]; // e.g., data:image/png;base64
      base64Data = parts[1];

      // Extract MIME from header
      const mimeMatch = header.match(/data:([^;]+);base64/);
      if (mimeMatch) {
        detectedMime = mimeMatch[1];
      }
    }

    // Validate Base64
    const buffer = Buffer.from(base64Data, "base64");
    const reEncoded = buffer.toString("base64");

    // Check if re-encoding matches (valid base64)
    if (reEncoded !== base64Data.replace(/\s/g, "")) {
      // Try a more lenient check
      if (buffer.length === 0) {
        return {
          file_valid: false,
          file_mime_type: null,
          file_size_kb: null,
        };
      }
    }

    // Detect MIME type from magic bytes if not from header
    if (!detectedMime) {
      detectedMime = detectMimeFromBuffer(buffer);
    }

    // Calculate file size in KB
    const fileSizeKb = parseFloat((buffer.length / 1024).toFixed(2));

    return {
      file_valid: true,
      file_mime_type: detectedMime || "application/octet-stream",
      file_size_kb: fileSizeKb,
    };
  } catch (error) {
    return {
      file_valid: false,
      file_mime_type: null,
      file_size_kb: null,
    };
  }
}

/**
 * Detect MIME type from buffer magic bytes
 */
function detectMimeFromBuffer(buffer) {
  if (buffer.length < 4) return null;

  const hex = buffer.toString("hex", 0, Math.min(buffer.length, 16));

  // PNG
  if (hex.startsWith("89504e47")) return "image/png";
  // JPEG
  if (hex.startsWith("ffd8ff")) return "image/jpeg";
  // GIF
  if (hex.startsWith("47494638")) return "image/gif";
  // PDF
  if (hex.startsWith("25504446")) return "application/pdf";
  // ZIP
  if (hex.startsWith("504b0304")) return "application/zip";
  // BMP
  if (hex.startsWith("424d")) return "image/bmp";
  // WEBP
  if (hex.startsWith("52494646") && buffer.toString("ascii", 8, 12) === "WEBP")
    return "image/webp";
  // MP3
  if (hex.startsWith("494433") || hex.startsWith("fffb")) return "audio/mpeg";
  // WAV
  if (hex.startsWith("52494646") && buffer.toString("ascii", 8, 12) === "WAVE")
    return "audio/wav";

  return "application/octet-stream";
}

module.exports = {
  generateUserId,
  isPrime,
  extractNumbers,
  extractAlphabets,
  getHighestLowercaseAlphabet,
  checkPrimeExists,
  processFile,
};
