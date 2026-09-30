import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI stored in environment variables.
 * 
 * WHY WE DO THIS:
 * - Keeps database connection logic in ONE place (separation of concerns)
 * - Uses environment variables so we don't hardcode credentials
 * - Handles connection errors gracefully
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process with failure code if database fails
    process.exit(1);
  }
};

export default connectDB;