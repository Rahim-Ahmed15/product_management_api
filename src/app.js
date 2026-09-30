import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

/**
 * Initialize Express app and configure middlewares.
 * 
 * WHY SEPARATE app.js FROM server.js:
 * - app.js configures the Express application
 * - server.js starts the server and connects to DB
 * - Easier to test app.js independently (unit tests)
 */
const app = express();

// ─── GLOBAL MIDDLEWARES ─────────────────────────────────

// Parse JSON request bodies
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Enable CORS
app.use(
  cors({
    origin: "*", // In production, restrict to your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── HEALTH CHECK ───────────────────────────────────────

/**
 * Health check endpoint — proves the server is alive.
 * Useful for deployment platforms (Render, Railway) and monitoring.
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Management API is running",
    version: "1.0.0",
    endpoints: {
      getAllProducts: "GET /api/products",
      getProductById: "GET /api/products/:id",
      createProduct: "POST /api/products",
      updateProduct: "PUT /api/products/:id",
      deleteProduct: "DELETE /api/products/:id",
    },
  });
});

// ─── API ROUTES ─────────────────────────────────────────

app.use("/api/products", productRoutes);

// ─── ERROR HANDLING ─────────────────────────────────────

// 404 Not Found — runs when no route matches
app.use(notFound);

// Centralized error handler — runs when next(error) is called
app.use(errorHandler);

export default app;