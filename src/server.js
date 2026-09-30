import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

/**
 * SERVER ENTRY POINT
 * 
 * RESPONSIBILITIES:
 * 1. Load environment variables
 * 2. Connect to MongoDB
 * 3. Start Express server
 * 4. Handle graceful shutdown
 * 
 * WHY THIS FILE IS SEPARATE:
 * - Easier to test app.js without starting a server
 * - Clear separation: config vs. logic vs. startup
 */

// 1. Load environment variables FIRST
dotenv.config();

// 2. Define PORT from environment (fallback to 5000)
const PORT = process.env.PORT || 5000;

// 3. Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log("═".repeat(50));
      console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`📚 API Base: http://localhost:${PORT}/api/products`);
      console.log("═".repeat(50));
    });

    // ─── GRACEFUL SHUTDOWN ─────────────────────────────
    /**
     * Handle unhandled promise rejections
     */
    process.on("unhandledRejection", (err) => {
      console.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

    /**
     * Handle uncaught exceptions
     */
    process.on("uncaughtException", (err) => {
      console.error(`❌ Uncaught Exception: ${err.message}`);
      server.close(() => process.exit(1));
    });

    /**
     * Graceful shutdown on SIGTERM (Render/Heroku sends this)
     */
    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// 4. Start the server
startServer();