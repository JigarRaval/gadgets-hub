const express = require("express");
const {
  getVendorProducts,
  getVendorProduct,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
} = require("../controllers/vendorProductController");
const { vendorAuth } = require("../middleware/authMiddleware");
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

// Vendor protected routes
router.get("/", vendorAuth, getVendorProducts);
router.get("/:id", vendorAuth, getVendorProduct);
router.post("/", vendorAuth, upload.single("image"), createVendorProduct);
router.put("/:id", vendorAuth, upload.single("image"), updateVendorProduct);
router.delete("/:id", vendorAuth, deleteVendorProduct);

module.exports = router;
