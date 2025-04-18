const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getVendorProducts,
  getVendorProduct,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
} = require("../controllers/vendorProductController"); // ✅ Correct import path

const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", protect, getVendorProducts);
router.get("/:id", protect, getVendorProduct);
router.post("/", protect, upload.single("image"), createVendorProduct); // ✅
router.put("/:id", protect, updateVendorProduct);
router.delete("/:id", protect, deleteVendorProduct);

module.exports = router;
