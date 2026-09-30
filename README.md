# Product Management REST API

A backend REST API for managing products using **Node.js, Express.js, MongoDB, and Mongoose**. This project was developed as a Backend Development Internship project and demonstrates CRUD operations, validation, middleware, centralized error handling, and modular backend architecture.

## Features

* Create products
* Get all products
* Get a single product
* Update products
* Delete products
* MongoDB database integration
* Mongoose schema validation
* Request validation middleware
* MongoDB ObjectId validation
* Centralized error handling
* Standardized JSON responses
* Proper HTTP status codes
* CORS support
* Environment variable configuration
* Health-check endpoint
* Graceful server shutdown
* Nodemon development setup

## Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **MongoDB** — Database
* **Mongoose** — MongoDB ODM
* **dotenv** — Environment variables
* **CORS** — Cross-origin requests
* **Nodemon** — Development server

## Project Structure

```text
product-management-api/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── product.controller.js
│   │
│   ├── middleware/
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   └── product.model.js
│   │
│   ├── routes/
│   │   └── product.routes.js
│   │
│   ├── utils/
│   │   └── apiResponse.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git https://github.com/Rahim-Ahmed15/product_management_api.git
cd product-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/product_management_db
NODE_ENV=development
```

For MongoDB Atlas:

```Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://myActualUser:myActualPassword123@cluster.mongodb.net/product_management_db?retryWrites=true&w=majority

```
```

> Do not commit `.env` to GitHub.

## Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will run at:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api/products
```

## API Endpoints

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/products`     | Get all products  |
| GET    | `/api/products/:id` | Get product by ID |
| POST   | `/api/products`     | Create a product  |
| PUT    | `/api/products/:id` | Update a product  |
| DELETE | `/api/products/:id` | Delete a product  |

## Product Model

```text
name
description
price
category
stock
createdAt
updatedAt
```

### Supported Categories

```text
Electronics
Clothing
Food
Books
Furniture
Sports
Toys
Other
```

## Create Product

### Request

```http
POST /api/products
```

```json
{
  "name": "Laptop",
  "description": "Development laptop",
  "price": 150000,
  "category": "Electronics",
  "stock": 10
}
```

### Response

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6a7b8c9d0e1",
    "name": "Laptop",
    "description": "Development laptop",
    "price": 150000,
    "category": "Electronics",
    "stock": 10
  }
}
```

## Get All Products

```http
GET /api/products
```

Example response:

```json
{
  "success": true,
  "message": "1 product(s) found",
  "data": {
    "count": 1,
    "products": [
      {
        "_id": "66a1b2c3d4e5f6a7b8c9d0e1",
        "name": "Laptop",
        "description": "Development laptop",
        "price": 150000,
        "category": "Electronics",
        "stock": 10
      }
    ]
  }
}
```

## Get Product By ID

```http
GET /api/products/:id
```

Example:

```text
GET /api/products/66a1b2c3d4e5f6a7b8c9d0e1
```

## Update Product

```http
PUT /api/products/:id
```

Example request:

```json
{
  "name": "Gaming Laptop",
  "description": "Updated development laptop",
  "price": 200000,
  "category": "Electronics",
  "stock": 5
}
```

## Delete Product

```http
DELETE /api/products/:id
```

Example:

```text
DELETE /api/products/66a1b2c3d4e5f6a7b8c9d0e1
```

## Validation

The API validates product data before storing it in MongoDB.

Examples:

* Product name is required
* Description is required
* Price cannot be negative
* Stock cannot be negative
* Category must be valid
* Product ID must be a valid MongoDB ObjectId
* Request body cannot be empty
* Only allowed fields can be submitted

## Error Handling

Errors are handled through centralized middleware.

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "price",
      "message": "Price cannot be negative"
    }
  ]
}
```

### HTTP Status Codes

| Code  | Meaning                            |
| ----- | ---------------------------------- |
| `200` | Successful request                 |
| `201` | Resource created                   |
| `400` | Invalid request / validation error |
| `404` | Resource not found                 |
| `500` | Internal server error              |

## Request Flow

```text
Client
   ↓
Express Server
   ↓
Global Middleware
   ↓
Routes
   ↓
Validation Middleware
   ↓
Controller
   ↓
Mongoose
   ↓
MongoDB
   ↓
JSON Response
```

If an error occurs:

```text
Error
   ↓
Error Handling Middleware
   ↓
Standard JSON Error Response
```

## Testing

The API can be tested using **Postman**, **Insomnia**, or cURL.

### Recommended Test Cases

| #  | Test                        | Expected |
| -- | --------------------------- | -------- |
| 1  | Create valid product        | `201`    |
| 2  | Missing required fields     | `400`    |
| 3  | Negative price              | `400`    |
| 4  | Get all products            | `200`    |
| 5  | Get valid product           | `200`    |
| 6  | Invalid product ID          | `400`    |
| 7  | Product does not exist      | `404`    |
| 8  | Update product              | `200`    |
| 9  | Update non-existing product | `404`    |
| 10 | Delete product              | `200`    |
| 11 | Delete non-existing product | `404`    |

## Health Check

The root endpoint verifies that the API is running:

```http
GET /
```

Expected response:

```json
{
  "success": true,
  "message": "Product Management API is running",
  "version": "1.0.0"
}
```

## Key Concepts Demonstrated

This project demonstrates practical understanding of:

* REST API development
* CRUD operations
* Express.js routing
* Middleware
* MVC-style architecture
* MongoDB and Mongoose
* Schema validation
* Request validation
* Error handling
* HTTP status codes
* Environment variables
* API testing
* Modular backend architecture

## Internship Deliverables

* [x] REST API
* [x] CRUD operations
* [x] MongoDB integration
* [x] Mongoose model
* [x] Validation
* [x] Middleware
* [x] Centralized error handling
* [x] Standardized responses
* [x] API testing
* [x] Environment configuration
* [x] Modular project structure
* [x] README documentation

## Author

**Rahim Ahmed**

Backend Development Internship Project

GitHub:

```text
https://github.com/Rahim-Ahmed15/product_management_api.git
```


## License

This project was developed for **educational and internship purposes**.
