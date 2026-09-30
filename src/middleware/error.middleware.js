import { sendError } from "../utils/apiResponse.js";

/**
 * 404 Not Found Middleware
 * Runs when NO route matches the request.
 */
export const notFound = (req, res, next) => {
  return sendError(
    res,
    404,
    `Route not found: ${req.method} ${req.originalUrl}`
  );
};

/**
 * Centralized Error Handling Middleware
 * 
 * WHY THIS MATTERS:
 * - Without this, every controller needs its own try/catch
 * - Handles Mongoose errors, validation errors, and custom errors
 * - Prevents leaking stack traces to clients in production
 */
export const errorHandler = (err, req, res, next) => {
  // Log the full error for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Handle Mongoose: Invalid ObjectId (e.g., /api/products/abc123)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid product ID format";
  }

  // Handle Mongoose: Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Handle Mongoose: Duplicate Key Error (unique field)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

  // Handle JWT errors (in case you add auth later)
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // Never expose internal errors in production
  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Something went wrong. Please try again later.";
  }

  return sendError(res, statusCode, message, errors);
};