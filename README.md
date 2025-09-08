# 🏨 Hotel Booking System - MERN Stack

A complete hotel booking system built with MongoDB, Express.js, React, and Node.js featuring advanced AI recommendations, chatbot assistant, and analytics dashboard.

## ✨ Features

### 🎯 Core Features
- **User Authentication**: JWT-based secure login/register system
- **Hotel Management**: Browse, search, and filter hotels
- **Booking System**: Complete booking flow with room availability tracking
- **User Dashboard**: Manage bookings and view history
- **Admin Panel**: Full hotel and booking management

### 🚀 Advanced Features
- **AI Recommendations**: Personalized hotel suggestions based on user preferences
- **Chatbot Assistant**: Interactive booking assistant with natural language processing
- **Analytics Dashboard**: Comprehensive charts and insights using Recharts
- **Real-time Updates**: Live room availability and booking status
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React** with functional components and hooks
- **React Router DOM** for navigation
- **Axios** for API calls
- **Recharts** for data visualization
- **CSS3** with responsive design

## 📁 Project Structure

```
hotel-booking-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── hotelController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Hotel.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── hotels.js
│   │   ├── bookings.js
│   │   └── admin.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── HotelCard.js
│   │   │   ├── BookingForm.js
│   │   │   └── Chatbot.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Hotels.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── Analytics.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hotel-booking-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hotel-booking
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

5. **Seed the database with sample data**
   ```bash
   cd backend
   node scripts/seedData.js
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 👥 Sample Accounts

After running the seed script, you can use these accounts:

### Admin Account
- **Email**: admin@hotelbooking.com
- **Password**: admin123
- **Access**: Full admin dashboard, hotel management, analytics

### User Accounts
- **Email**: john@example.com | **Password**: password123
- **Email**: jane@example.com | **Password**: password123
- **Email**: mike@example.com | **Password**: password123

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `GET /api/hotels/recommended` - Get recommended hotels (protected)
- `POST /api/hotels` - Create hotel (admin only)
- `PUT /api/hotels/:id` - Update hotel (admin only)
- `DELETE /api/hotels/:id` - Delete hotel (admin only)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user bookings (protected)
- `GET /api/bookings/all` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

### Admin
- `GET /api/admin/dashboard` - Get dashboard data (admin only)
- `GET /api/admin/analytics` - Get analytics data (admin only)

## 🤖 AI Features

### Recommendation System
The AI recommendation system analyzes user preferences including:
- Past booking locations
- Budget range preferences
- Preferred amenities
- Booking patterns

### Chatbot Assistant
The chatbot can help users with:
- Finding hotels in specific locations
- Checking prices and amenities
- Booking assistance
- General hotel information
- Cancellation policies

## 📊 Analytics Dashboard

The analytics dashboard provides:
- Hotel occupancy rates
- Booking trends by month
- Revenue analysis per hotel
- Seasonal demand patterns
- Key performance indicators

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # Starts React development server
```

### Database Management
```bash
# Seed sample data
node scripts/seedData.js

# Clear database (be careful!)
# Delete collections manually or use MongoDB Compass
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Update environment variables with production values
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Check the documentation
- Review the sample data and API endpoints

---

**Built with ❤️ using the MERN stack**
