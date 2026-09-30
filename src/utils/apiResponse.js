/**
 * Standardized API response helpers.
 * 
 * WHY WE USE THIS:
 * - Consistent response format across ALL endpoints
 * - Frontend developers know what to expect
 * - Less code repetition in controllers
 */

/**
 * Send a SUCCESS response.
 */
export const sendSuccess = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send an ERROR response.
 */
export const sendError = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};