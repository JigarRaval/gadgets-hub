const Product = require("../models/Product");
const Vendor = require("../models/Vendor"); // Ensure you have Vendor model
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all products for a vendor
// @route   GET /api/vendor-products
// @access  Private
exports.getVendorProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ vendor: req.vendor.id });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product for a vendor
// @route   GET /api/vendor-products/:id
// @access  Private
exports.getVendorProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    vendor: req.vendor.id,
  });

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create product for a vendor
// @route   POST /api/vendor-products
// @access  Private
exports.createVendorProduct = asyncHandler(async (req, res, next) => {
  // Add vendor to body
  // console.log(req.body)
  req.body.vendor = req.vendor.id;

  // Save first uploaded image
  if (req.files && req.files.length > 0) {
    req.body.image = `/uploads/${req.files[0].filename}`;
  }

  // Generate numericId dynamically
  const latestProduct = await Product.findOne().sort({ numericId: -1 }).lean();
  const nextNumericId = latestProduct ? latestProduct.numericId + 1 : 1;
  req.body.numericId = nextNumericId;

  // Create product
  const product = await Product.create(req.body);

  // Optional: Update Vendor document (if needed)
  await Vendor.findByIdAndUpdate(req.vendor.id, {
    $push: { products: product._id },
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product for a vendor
// @route   PUT /api/vendor-products/:id
// @access  Private
exports.updateVendorProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure vendor owns the product
  if (product.vendor.toString() !== req.vendor.id) {
    return next(
      new ErrorResponse(`Not authorized to update this product`, 401)
    );
  }

  // Handle image update if needed
  if (req.files && req.files.length > 0) {
    req.body.image = `/uploads/${req.files[0].filename}`;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product for a vendor
// @route   DELETE /api/vendor-products/:id
// @access  Private
exports.deleteVendorProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure vendor owns the product
  if (product.vendor.toString() !== req.vendor.id) {
    return next(
      new ErrorResponse(`Not authorized to delete this product`, 401)
    );
  }

  await product.remove();

  // Optional: Remove from Vendor products array
  await Vendor.findByIdAndUpdate(req.vendor.id, {
    $pull: { products: product._id },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
