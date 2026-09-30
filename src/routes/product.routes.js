import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import {
  validateObjectId,
  validateBody,
  validateFields,
} from "../middleware/validate.middleware.js";

const router = express.Router();

/**
 * Route definitions for /api/products
 * 
 * WHY SEPARATE ROUTES FROM CONTROLLERS:
 * - Routes define URLs and middlewares
 * - Controllers contain business logic
 * - Easier to maintain, test, and reason about
 */

// POST /api/products — Create new product
router.post(
  "/",
  validateBody,
  validateFields("name", "description", "price", "category", "stock"),
  createProduct
);

// GET /api/products — Get all products
router.get("/", getAllProducts);

// GET /api/products/:id — Get single product
router.get("/:id", validateObjectId("id"), getProductById);

// PUT /api/products/:id — Update product
router.put(
  "/:id",
  validateObjectId("id"),
  validateBody,
  validateFields("name", "description", "price", "category", "stock"),
  updateProduct
);

// DELETE /api/products/:id — Delete product
router.delete("/:id", validateObjectId("id"), deleteProduct);

export default router;