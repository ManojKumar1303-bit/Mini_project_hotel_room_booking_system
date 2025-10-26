# Hotel Room Booking System

A full-stack web application for hotel room booking with admin dashboard, user management, and booking functionality.

## Features

### User Features
- User registration and authentication
- Browse available hotels
- Search and filter hotels
- Make hotel bookings
- View booking history
- Cancel bookings
- User dashboard

### Admin Features
- Admin authentication
- Add/Edit/Delete hotels
- View all bookings
- Manage hotel inventory
- Analytics dashboard
- Revenue tracking

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router
- Axios for API calls
- Context API for state management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mini_project_hotel_room_booking_system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 5. Database Setup
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service
mongod
```

### 6. Seed Database (Optional)
To populate the database with sample data:
```bash
cd backend
node scripts/seedData.js
```

## Running the Application

### Option 1: Using the Startup Script (Windows)
```bash
# Double-click start.bat or run:
start.bat
```

### Option 2: Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Default Accounts

### Admin Account
- Email: `admin@hotelbooking.com`
- Password: `admin123`

### User Accounts
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`
- Email: `mike@example.com`, Password: `password123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/recommended` - Get recommended hotels
- `POST /api/hotels` - Add hotel (Admin only)
- `PUT /api/hotels/:id` - Update hotel (Admin only)
- `DELETE /api/hotels/:id` - Delete hotel (Admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/all` - Get all bookings (Admin only)
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Admin
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/analytics` - Get analytics data

## Project Structure

```
Mini_project_hotel_room_booking_system/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── api.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── hotelController.js
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
│   ├── server.js
│   └── package.json
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
│   │   └── index.js
│   └── package.json
├── start.bat
└── README.md
```

## Features Implemented

### ✅ Completed Features
- User authentication (login/register)
- Hotel CRUD operations
- Booking system
- Admin dashboard
- User dashboard
- Hotel search and filtering
- Booking management
- Analytics dashboard
- Responsive design

### 🔧 Recent Fixes
- Fixed hotel addition functionality
- Added proper authentication middleware
- Fixed API endpoint errors
- Improved error handling
- Added comprehensive seed data
- Fixed frontend-backend integration

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check MongoDB URI in `.env` file

2. **Port Already in Use**
   - Backend: Change PORT in `.env` file
   - Frontend: React will prompt to use different port

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `.env` file

4. **Hotel Addition Not Working**
   - Ensure user is logged in as admin
   - Check browser console for errors
   - Verify backend server is running

### Development Tips

- Use browser developer tools to debug frontend issues
- Check backend console for server errors
- Use MongoDB Compass to view database data
- Test API endpoints using Postman or similar tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.