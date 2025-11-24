require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Url = require("./models/Url");

const app = express();
app.use(express.json());
app.use(cors());

// -----------------------------------------------------
// Connect MongoDB
// -----------------------------------------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// -----------------------------------------------------
// Utility: Validate URL
// -----------------------------------------------------
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// -----------------------------------------------------
// HEALTH CHECK
// -----------------------------------------------------
app.get("/healthz", (req, res) => {
  return res.status(200).json({ ok: true, version: "1.0" });
});

// -----------------------------------------------------
// CREATE LINK
// POST /api/links
// -----------------------------------------------------
app.post("/api/links", async (req, res) => {
  let { url, code } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  if (!code) {
    code = Math.random().toString(36).substring(2, 10);
  }

  const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;
  if (!CODE_REGEX.test(code)) {
    return res.status(400).json({ message: "Code must be 6-8 chars A-Z, a-z, 0-9" });
  }

  const existing = await Url.findOne({ shortCode: code });
  if (existing) {
    return res.status(409).json({ message: "Short code already exists" });
  }

  const newUrl = new Url({ shortCode: code, longUrl: url });
  await newUrl.save();

  return res.status(201).json({
    shortUrl: `${process.env.BASE_URL}/${code}`,
    shortCode: code,
    longUrl: url,
  });
});

// -----------------------------------------------------
// LIST ALL LINKS
// GET /api/links
// -----------------------------------------------------
app.get("/api/links", async (req, res) => {
  const links = await Url.find().sort({ createdAt: -1 });
  return res.json(links);
});

// -----------------------------------------------------
// GET STATS FOR ONE LINK
// GET /api/links/:code
// -----------------------------------------------------
app.get("/api/links/:code", async (req, res) => {
  const link = await Url.findOne({ shortCode: req.params.code });
  if (!link) return res.status(404).json({ message: "Not found" });
  return res.json(link);
});

// -----------------------------------------------------
// DELETE LINK
// DELETE /api/links/:code
// -----------------------------------------------------
app.delete("/api/links/:code", async (req, res) => {
  const deleted = await Url.findOneAndDelete({ shortCode: req.params.code });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  return res.status(204).send();
});

// -----------------------------------------------------
// REDIRECT LOGIC
// GET /:code
// -----------------------------------------------------
app.get("/:code", async (req, res) => {
  const code = req.params.code;

  if (code.includes(".")) {
    return res.status(404).send("Not found");
  }

  const link = await Url.findOne({ shortCode: code });
  if (!link) return res.status(404).send("Not found");

  link.clicks += 1;
  link.lastClicked = new Date();
  await link.save();

  return res.redirect(302, link.longUrl);
});

// -----------------------------------------------------
// START SERVER
// Use fallback port 5000 for local development
// -----------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
