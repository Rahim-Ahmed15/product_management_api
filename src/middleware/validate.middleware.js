import mongoose from "mongoose";
import { sendError } from "../utils/apiResponse.js";

/**
 * Validates that :id param is a valid MongoDB ObjectId.
 * 
 * WHY:
 * - Prevents database errors from malformed IDs
 * - Returns a clean 400 error instead of a 500
 */
export const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, `Invalid ${paramName}: not a valid MongoDB ID`);
    }

    next();
  };
};

/**
 * Validates that request body is not empty.
 * 
 * WHY:
 * - Prevents "empty body" errors
 * - Gives clear feedback to client
 */
export const validateBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendError(res, 400, "Request body cannot be empty");
  }

  next();
};

/**
 * Validates allowed fields in a request body.
 * 
 * WHY:
 * - Prevents clients from injecting unwanted fields
 * - Keeps data clean
 */
export const validateFields = (...allowedFields) => {
  return (req, res, next) => {
    const bodyFields = Object.keys(req.body);
    const invalidFields = bodyFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return sendError(
        res,
        400,
        `Invalid field(s): ${invalidFields.join(", ")}. Allowed: ${allowedFields.join(", ")}`
      );
    }

    next();
  };
};