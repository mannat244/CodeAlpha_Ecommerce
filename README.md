# 🛒 Gadget In Spot – E-Commerce Website

An end-to-end e-commerce web application developed as part of a full-stack development internship. "Gadget In Spot" allows users to browse, filter, and purchase electronic products such as smartphones, laptops, and accessories. The project focuses on building real-world e-commerce features using the **MERN (MongoDB, Express, React, Node.js)** stack along with **Next.js (App Router)**.

---

## 📌 Project Overview

**Tech Stack:** Next.js 14+, MongoDB, Node.js, Express.js  
**Developer:** Mannat Trivedi  
**Internship Duration:** 1 Month

This project was built to simulate a real-world shopping experience, focusing on the following areas:
- User authentication (via session-based login)
- Product listings with price, ratings, category filtering
- Shopping cart functionality with persistent storage
- Admin product management dashboard
- Clean and responsive UI design

---

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** using Iron Session
- **Session-based Authentication** for secure user management
- **Protected Routes** for cart, orders, and admin sections
- **Admin Access Control** with separate login credentials

### 🛍️ Product Management
- **Dynamic Product Listings** fetched from MongoDB
- **Product Details** including name, price, images, ratings, and descriptions
- **Category-based Filtering** for easy product discovery
- **Search Functionality** to find specific products
- **Product Reviews & Ratings** system

### 🛒 Shopping Cart
- **Add to Cart** functionality with quantity management
- **Cart Persistence** across user sessions
- **Cart Item Management** (update quantities, remove items)
- **Cart Total Calculation** with real-time updates

### 👨‍💼 Admin Dashboard
- **Product Inventory Management** (Add/Edit/Delete products)
- **Order Management** system
- **User Management** capabilities
- **Sales Analytics** and reporting

### 🌐 Application Structure
| Route | Purpose |
|-------|---------|
| `/` | Homepage with featured products |
| `/products` | All products listing page |
| `/product/[id]` | Individual product detail page |
| `/login` | User authentication page |
| `/logout` | User logout functionality |
| `/cart` | Shopping cart management |
| `/checkout` | Order placement and payment |
| `/orders` | User order history |
| `/profile` | User profile management |
| `/admin` | Admin dashboard |
| `/admin/login` | Admin authentication |
| `/admin/products` | Product management |
| `/admin/orders` | Order management |

---

## 🔧 Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React.js + Next.js 14 (App Router) |
| **Backend** | Node.js + Express.js (API Routes) |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | Iron Session (session-based) |
| **Styling** | Tailwind CSS |
| **UI Components** | Custom React components |
| **Icons** | Lucide React |
| **Deployment** | Vercel (Frontend) + MongoDB Atlas (Database) |

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/gadget-in-spot.git
cd gadget-in-spot

# 2. Install dependencies
npm install

# 3. Create environment variables file
cp .env.example .env.local
```

### Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gadget-in-spot

# Session Security
SESSION_PASSWORD=your-super-secret-session-password-min-32-chars

# Admin Credentials (for testing)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin@123

# Application URL (for production)
NEXTAUTH_URL=http://localhost:3000
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

The application will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
gadget-in-spot/
├── app/                          # Next.js App Router
│   ├── admin/                   # Admin dashboard pages
│   │   ├── login/              # Admin authentication
│   │   ├── orders/             # Order management
│   │   └── products/           # Product management
│   ├── api/                    # API routes (backend)
│   │   ├── admin/              # Admin API endpoints
│   │   ├── auth/               # Authentication APIs
│   │   ├── cart/               # Cart management APIs
│   │   ├── checkout/           # Checkout process APIs
│   │   ├── order/              # Order management APIs
│   │   └── products/           # Product APIs
│   ├── cart/                   # Shopping cart page
│   ├── checkout/               # Checkout process
│   ├── login/                  # User authentication
│   ├── logout/                 # Logout functionality
│   ├── orders/                 # User order history
│   ├── profile/                # User profile management
│   └── search/                 # Product search
├── components/                  # Reusable React components
│   ├── Navbar.js              # Navigation component
│   └── ProductDetails.js      # Product display component
├── lib/                        # Utility libraries
├── models/                     # MongoDB data models
├── store/                      # State management
│   └── [id]/                  # Dynamic store pages
├── public/                     # Static assets
├── .env.local                 # Environment variables
├── .gitignore                 # Git ignore rules
├── eslint.config.mjs         # ESLint configuration
├── layout.js                 # Root layout component
├── page.js                   # Homepage component
└── package.json              # Project dependencies
```

---

## 🚀 Key Features Implemented

### User Experience
- **Responsive Design** that works on desktop, tablet, and mobile
- **Fast Page Loading** with Next.js optimizations
- **Intuitive Navigation** with clear product categories
- **Search & Filter** functionality for easy product discovery

### Security Features
- **Session-based Authentication** for secure user management
- **Protected API Routes** to prevent unauthorized access
- **Input Validation** on both client and server side
- **Admin Role Separation** with secure admin access

### Performance Optimizations
- **Server-Side Rendering (SSR)** for better SEO and initial load times
- **Image Optimization** with Next.js Image component
- **API Route Optimization** for efficient data fetching
- **Database Indexing** for faster query performance

---

## 🧪 Testing

### Admin Access
For testing admin functionality, use these credentials:
- **Username:** `admin`
- **Password:** `admin@123`

### Test User Scenarios
1. **User Registration:** Create a new account and verify email functionality
2. **Product Browsing:** Navigate through different product categories
3. **Cart Operations:** Add/remove items, update quantities
4. **Checkout Process:** Complete a test purchase
5. **Admin Functions:** Manage products and view orders

---

## 🌟 Learning Outcomes

This internship project provided hands-on experience with:
- **Full-stack Development** using the MERN stack
- **Next.js App Router** and modern React patterns
- **Database Design** and MongoDB operations
- **Authentication Systems** and session management
- **E-commerce Business Logic** and user experience design
- **API Development** and RESTful principles
- **Responsive Web Design** with Tailwind CSS

---

## 🤝 Contributing

This project was developed as part of an internship program. For any questions or suggestions, please feel free to reach out.

---

## 📧 Contact

**Developer:** Mannat Trivedi  
**Project Duration:** 1 Month (Internship Project)

---

## 📄 License

This project was created for educational purposes as part of a 1-month full-stack development internship program.

---

*Built with ❤️ during a 1-month full-stack development internship*
