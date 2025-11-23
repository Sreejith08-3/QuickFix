# QuickFix Backend - MERN Stack

This directory contains the backend code for the QuickFix platform built with Node.js, Express, and MongoDB.

## 📁 Directory Structure

```
backend/
├── config/           # Configuration files (database, environment variables)
├── controllers/      # Route handlers and business logic
├── models/          # Mongoose schemas and models
├── routes/          # API route definitions
├── middleware/      # Custom middleware (auth, error handling, validation)
├── utils/           # Helper functions and utilities
├── services/        # Business logic and third-party integrations
├── uploads/         # File uploads directory
├── .env.example     # Environment variables template
├── server.js        # Entry point
└── package.json     # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
- MongoDB connection string
- JWT secrets
- API keys (Stripe, OpenAI, etc.)
- Port configuration

5. Start development server:
```bash
npm run dev
```

## 🔧 Environment Variables

See `.env.example` for all required environment variables.

## 📡 API Endpoints

See `/routes` folder for detailed API documentation.

## 🔐 Authentication

JWT-based authentication with refresh tokens.
Access token expires in 15 minutes, refresh token in 7 days.

## 🗄️ Database Models

See `/models` folder for schema definitions.

## 🧪 Testing

```bash
npm test
```

## 📦 Deployment

Recommended platforms:
- Heroku
- AWS EC2
- Render
- Railway

## 📝 Notes

- All API responses follow standard format: `{ success, data, message, error }`
- File uploads are handled by Multer and stored in `/uploads` or cloud storage
- Error handling is centralized in middleware
- All endpoints (except public) require JWT authentication
