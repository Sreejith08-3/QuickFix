# 📁 QuickFix - Project Structure

This document provides a complete overview of the QuickFix MERN stack project structure.

---

## 🏗️ Overall Structure

```
quickfix/
├── frontend/                    # React + TypeScript Frontend (src folder)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Node.js + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── BACKEND_CONNECTION_GUIDE.md  # Complete backend setup guide
├── PROJECT_STRUCTURE.md         # This file
└── README.md                    # Main project README
```

---

## 📂 Frontend Structure (`src/`)

```
src/
├── assets/                      # Static assets
│   └── hero-image.jpg          # Hero section background
│
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ... (40+ UI components)
│   │
│   ├── Chatbot.tsx             # AI chatbot component
│   ├── EmergencyButton.tsx     # Emergency service button
│   ├── LanguageSwitcher.tsx    # Multi-language support
│   ├── Navigation.tsx          # Main navigation bar
│   ├── NavLink.tsx             # Navigation link component
│   ├── ServiceCard.tsx         # Service display card
│   └── TechnicianCard.tsx      # Technician profile card
│
├── contexts/                    # React Context providers
│   ├── AuthContext.tsx         # Authentication state
│   └── LanguageContext.tsx     # Language selection state
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notifications hook
│
├── lib/                         # Utility libraries
│   ├── mockData.ts             # Mock data (Kerala-based)
│   ├── translations.ts         # Multi-language translations
│   └── utils.ts                # Utility functions
│
├── pages/                       # Page components (routes)
│   ├── Index.tsx               # Home/Landing page
│   ├── Auth.tsx                # Login/Signup page
│   ├── Services.tsx            # Services listing page
│   ├── Dashboard.tsx           # User dashboard
│   ├── Emergency.tsx           # Emergency booking page
│   ├── Forum.tsx               # Community forum
│   ├── AIdiagnostic.tsx        # AI-powered diagnostics
│   ├── Booking.tsx             # Service booking page
│   ├── BecomeTechnician.tsx    # Technician registration
│   ├── AboutUs.tsx             # About page
│   ├── Admin.tsx               # Admin login page
│   ├── AdminDashboard.tsx      # Admin dashboard
│   └── NotFound.tsx            # 404 page
│
├── types/                       # TypeScript type definitions
│   └── index.ts                # All type interfaces
│
├── App.tsx                      # Main app component
├── main.tsx                     # React entry point
├── index.css                    # Global styles + design tokens
└── vite-env.d.ts               # Vite type definitions
```

---

## 🔧 Backend Structure (`backend/`)

```
backend/
├── config/                      # Configuration files
│   ├── db.js                   # MongoDB connection
│   └── cloudinary.js           # File upload config
│
├── controllers/                 # Request handlers (business logic)
│   ├── auth.controller.js      # Auth logic
│   ├── user.controller.js      # User management
│   ├── technician.controller.js # Technician management
│   ├── service.controller.js   # Service management
│   ├── booking.controller.js   # Booking logic
│   ├── review.controller.js    # Review system
│   ├── forum.controller.js     # Forum logic
│   ├── chat.controller.js      # Real-time chat
│   ├── ai.controller.js        # AI features
│   ├── payment.controller.js   # Stripe payments
│   └── admin.controller.js     # Admin operations
│
├── middleware/                  # Express middleware
│   ├── auth.middleware.js      # JWT authentication
│   ├── errorHandler.js         # Error handling
│   ├── upload.middleware.js    # File upload (multer)
│   └── validation.middleware.js # Input validation
│
├── models/                      # Mongoose schemas
│   ├── User.model.js           # User schema
│   ├── Technician.model.js     # Technician schema
│   ├── Service.model.js        # Service schema
│   ├── Booking.model.js        # Booking schema
│   ├── Review.model.js         # Review schema
│   ├── ForumPost.model.js      # Forum post schema
│   ├── Comment.model.js        # Comment schema
│   ├── Chat.model.js           # Chat schema
│   ├── Notification.model.js   # Notification schema
│   ├── Payment.model.js        # Payment schema
│   └── AIDiagnostic.model.js   # AI diagnostic schema
│
├── routes/                      # API route definitions
│   ├── auth.routes.js          # POST /api/auth/login, /register
│   ├── user.routes.js          # GET/PUT /api/users/profile
│   ├── technician.routes.js    # GET/POST /api/technicians
│   ├── service.routes.js       # GET /api/services
│   ├── booking.routes.js       # POST/GET /api/bookings
│   ├── review.routes.js        # POST /api/reviews
│   ├── forum.routes.js         # GET/POST /api/forum/posts
│   ├── chat.routes.js          # WebSocket chat routes
│   ├── ai.routes.js            # POST /api/ai/diagnostic, /chatbot
│   ├── payment.routes.js       # POST /api/payment/create-intent
│   └── admin.routes.js         # GET/PUT /api/admin/*
│
├── utils/                       # Utility functions
│   ├── tokenUtils.js           # JWT token generation
│   ├── emailService.js         # Email notifications
│   ├── aiService.js            # OpenAI/Gemini integration
│   └── validators.js           # Input validators
│
├── server.js                    # Express app entry point
├── package.json                 # Backend dependencies
├── .env                         # Environment variables (DO NOT COMMIT)
├── .env.example                # Example env variables
└── README.md                    # Backend-specific README
```

---

## 🗄️ MongoDB Collections (Database Schema)

```
quickfix (database)
├── users                        # Customer accounts
│   ├── _id
│   ├── name
│   ├── email
│   ├── password (hashed)
│   ├── phone
│   ├── location
│   ├── role (customer/technician/admin)
│   └── createdAt
│
├── technicians                  # Technician profiles
│   ├── _id
│   ├── userId (ref: users)
│   ├── skills []
│   ├── rating
│   ├── totalJobs
│   ├── badges []
│   ├── verified
│   ├── hourlyRate
│   └── availability
│
├── services                     # Service categories
│   ├── _id
│   ├── category
│   ├── name
│   ├── description
│   ├── averagePrice
│   └── estimatedDuration
│
├── bookings                     # Service bookings
│   ├── _id
│   ├── userId (ref: users)
│   ├── technicianId (ref: technicians)
│   ├── serviceCategory
│   ├── status
│   ├── scheduledDate
│   ├── location
│   ├── estimatedCost
│   └── actualCost
│
├── reviews                      # Technician reviews
│   ├── _id
│   ├── bookingId (ref: bookings)
│   ├── userId (ref: users)
│   ├── technicianId (ref: technicians)
│   ├── rating
│   └── review
│
├── forumposts                   # Community forum posts
│   ├── _id
│   ├── authorId (ref: users)
│   ├── title
│   ├── content
│   ├── category
│   ├── upvotes
│   └── comments []
│
├── chats                        # Real-time chat messages
│   ├── _id
│   ├── bookingId (ref: bookings)
│   ├── senderId (ref: users)
│   ├── message
│   └── timestamp
│
├── notifications                # User notifications
│   ├── _id
│   ├── userId (ref: users)
│   ├── type
│   ├── message
│   ├── read
│   └── createdAt
│
├── payments                     # Payment records
│   ├── _id
│   ├── bookingId (ref: bookings)
│   ├── userId (ref: users)
│   ├── amount
│   ├── status
│   ├── stripePaymentId
│   └── createdAt
│
└── aidiagnostics               # AI diagnostic results
    ├── _id
    ├── userId (ref: users)
    ├── images []
    ├── predictedIssue
    ├── severity
    ├── estimatedCost
    ├── confidence
    └── createdAt
```

---

## 🎨 Design System

### Color Tokens (defined in `src/index.css`)

```css
:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(240, 10%, 3.9%);
  --primary: hsl(316, 70%, 50%);      /* Orchid theme */
  --primary-foreground: hsl(0, 0%, 98%);
  --secondary: hsl(240, 4.8%, 95.9%);
  --accent: hsl(240, 4.8%, 95.9%);
  --destructive: hsl(0, 84.2%, 60.2%);
  --border: hsl(240, 5.9%, 90%);
  --muted: hsl(240, 4.8%, 95.9%);
}
```

### Components Use Design Tokens

All components use semantic color tokens from the design system:
- ✅ `bg-primary`, `text-primary`
- ✅ `bg-accent`, `text-accent-foreground`
- ❌ Never use direct colors like `bg-white`, `text-black`

---

## 📱 Mobile-First & Responsive

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Optimizations
- Navbar collapses to hamburger menu on `lg` breakpoint
- Chatbot window adjusts width on mobile
- Emergency button repositions above chatbot on mobile
- Cards stack vertically on small screens
- Forms use full width on mobile

---

## 🔐 Authentication Flow

1. **User Registration** → `/api/auth/register`
   - Create user in MongoDB
   - Hash password with bcrypt
   - Return JWT token

2. **User Login** → `/api/auth/login`
   - Verify credentials
   - Generate JWT + Refresh token
   - Store token in localStorage

3. **Protected Routes**
   - Frontend checks for token
   - Backend verifies JWT in `auth.middleware.js`
   - Redirect to `/auth` if unauthorized

4. **Token Refresh** → `/api/auth/refresh`
   - Use refresh token to get new access token
   - Extend session without re-login

---

## 🚀 Development Workflow

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### Build for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
npm run build
# Creates optimized production build in dist/
```

---

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
cd backend
npm test
```

### API Testing
- Use **Postman** or **Thunder Client**
- Import API collection from `backend/postman_collection.json`
- Test all endpoints with sample data

---

## 📦 Key Dependencies

### Frontend
- `react` ^18.3.1
- `react-router-dom` ^6.30.1
- `@tanstack/react-query` ^5.83.0
- `tailwindcss` + `shadcn/ui`
- `lucide-react` (icons)
- `axios` (API calls)

### Backend
- `express` ^4.18.2
- `mongoose` ^7.5.0
- `jsonwebtoken` ^9.0.2
- `bcryptjs` ^2.4.3
- `socket.io` ^4.6.1
- `stripe` ^12.0.0
- `multer` + `cloudinary`
- `nodemailer`

---

## 🎯 Quick Start Summary

1. ✅ Clone the repo
2. ✅ Install dependencies: `npm install` (frontend), `cd backend && npm install`
3. ✅ Set up MongoDB Atlas
4. ✅ Configure `.env` files
5. ✅ Start backend: `cd backend && npm run dev`
6. ✅ Start frontend: `npm run dev`
7. ✅ Open browser: `http://localhost:5173`
8. ✅ Test connection and start coding!

---

## 📞 Need Help?

- Check `BACKEND_CONNECTION_GUIDE.md` for MongoDB setup
- Review `backend/README.md` for API documentation
- Check individual component files for inline documentation
- All placeholder code has `TODO` comments for easy identification

---

**Happy coding! 🚀 Let's build an amazing QuickFix platform together!**
