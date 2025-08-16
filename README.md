# 🚀 Task Manager REST API

A robust, production-ready REST API for task management with user authentication, built using Express.js, MongoDB, and JWT authentication. This project demonstrates full-stack development skills with proper security practices, validation, and error handling.

## ✨ Features

- **🔐 User Authentication**: Secure signup and login with JWT tokens
- **📋 Task Management**: Full CRUD operations for tasks with user isolation
- **✅ Data Validation**: Comprehensive request validation using express-validator
- **🛡️ Security**: Password hashing with bcrypt, rate limiting, and helmet security
- **💚 Health Monitoring**: API health check endpoints for monitoring
- **📄 Pagination**: Built-in pagination for task listings
- **🚨 Error Handling**: Proper error responses with appropriate HTTP status codes
- **⚡ Performance**: Optimized database queries and middleware

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **Development**: nodemon for auto-reload

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment example file
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Configure Environment Variables**
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string
   ```

6. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔌 API Endpoints

### 🔐 Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and get JWT token.

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

### 📋 Tasks

**Note:** All task endpoints require authentication via JWT token in the Authorization header.

#### POST `/api/tasks`
Create a new task.

#### GET `/api/tasks`
Get all tasks for the authenticated user with pagination and filtering.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `completed`: Filter by completion status (true/false)
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort order (asc/desc, default: desc)

#### GET `/api/tasks/:id`
Get a specific task by ID.

#### PUT `/api/tasks/:id`
Update a task.

#### DELETE `/api/tasks/:id`
Delete a task.

#### PATCH `/api/tasks/:id/toggle`
Toggle task completion status.

### Health Check

#### GET `/api/health`
Basic health check endpoint.

#### GET `/api/health/detailed`
Detailed health check with database ping and system information.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses with appropriate HTTP status codes:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "field_name",
      "message": "Validation error message",
      "value": "invalid_value"
    }
  ]
}
```

## Validation Rules

### User Registration
- Username: 3-30 characters, alphanumeric + underscore only
- Email: Valid email format
- Password: Minimum 6 characters, must contain at least one number

### Task Creation/Update
- Title: 3-200 characters
- Completed: Boolean value (optional)

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Default: 100 requests per 15 minutes per IP address
- Configurable via environment variables

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Security**: Configurable expiration and secret
- **CORS Protection**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Rate Limiting**: Protection against brute force attacks

## 🏗️ Project Structure

```
task-manager-api/
├── 📁 models/          # Mongoose database models
├── 📁 routes/          # API route handlers
├── 📁 middleware/      # Custom middleware (auth, validation)
├── 📄 server.js        # Main Express application
├── 📄 package.json     # Dependencies and scripts
├── 📄 env.example      # Environment variables template
├── 📄 start.js         # Setup helper script
├── 📄 test-api.js      # API testing script
└── 📄 README.md        # This documentation
```

## 🚀 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `node start.js` - Run initial setup and configuration
- `node test-api.js` - Run API tests


## 🧪 Testing the API

You can test the API using tools like:
- **Postman**
- **Insomnia**
- **cURL**
- **Thunder Client (VS Code extension)**

### Example cURL Commands

**User Registration:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**User Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Create Task (with token):**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test task",
    "completed": false
  }'
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_very_secure_jwt_secret
JWT_EXPIRES_IN=7d
```

### Deployment Options
- **Heroku** - Easy deployment with Git integration
- **Railway** - Modern deployment platform
- **Render** - Free tier available
- **DigitalOcean App Platform** - Scalable cloud deployment
- **AWS EC2** - Full control over infrastructure
- **Docker** - Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

