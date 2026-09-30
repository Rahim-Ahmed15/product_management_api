import mongoose from "mongoose";

/**
 * Product Schema — defines the shape of a Product document in MongoDB.
 * 
 * WHY SCHEMAS MATTER:
 * - MongoDB is schema-less by default, but Mongoose adds structure
 * - Validation happens BEFORE data reaches the database
 * - Prevents bad data like negative prices or missing names
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      enum: {
        values: [
          "Electronics",
          "Clothing",
          "Food",
          "Books",
          "Furniture",
          "Sports",
          "Toys",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

/**
 * Text index for search — optional but useful.
 * Allows future GET /api/products?search=laptop functionality.
 */
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;