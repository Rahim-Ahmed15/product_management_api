import Product from "../models/product.model.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Explicit validation (defense-in-depth — Mongoose also validates)
    if (!name || !description || price === undefined || !category) {
      return sendError(res, 400, "Missing required fields: name, description, price, category");
    }

    if (price < 0) {
      return sendError(res, 400, "Price cannot be negative");
    }

    if (stock !== undefined && stock < 0) {
      return sendError(res, 400, "Stock cannot be negative");
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock: stock || 0,
    });

    return sendSuccess(res, 201, "Product created successfully", product);
  } catch (error) {
    next(error); // Pass to centralized error handler
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return sendSuccess(res, 200, `${products.length} product(s) found`, {
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    return sendSuccess(res, 200, "Product retrieved successfully", product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Public
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Explicit validation
    if (price !== undefined && price < 0) {
      return sendError(res, 400, "Price cannot be negative");
    }

    if (stock !== undefined && stock < 0) {
      return sendError(res, 400, "Stock cannot be negative");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock },
      {
        new: true,               // Return the UPDATED document
        runValidators: true,     // Run Mongoose validators
        context: "query",
      }
    );

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    return sendSuccess(res, 200, "Product updated successfully", product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    return sendSuccess(res, 200, "Product deleted successfully", product);
  } catch (error) {
    next(error);
  }
};