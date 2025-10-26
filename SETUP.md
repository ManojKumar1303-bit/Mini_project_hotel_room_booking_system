# Hotel Booking System - Setup Guide

## Quick Start Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

### 1. Install Dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup
Create a `.env` file in the backend directory with:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### 4. Seed Database (Optional)
To populate with sample data:
```bash
cd backend
node scripts/seedData.js
```

### 5. Start the Application

#### Option A: Using the startup script (Windows)
```bash
# Double-click start.bat
```

#### Option B: Manual start
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Accounts

### Admin Account
- Email: `admin@hotelbooking.com`
- Password: `admin123`

### User Accounts
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`
- Email: `mike@example.com`, Password: `password123`

## Features Available

### User Features
✅ User registration and login
✅ Browse hotels
✅ Search and filter hotels
✅ Make hotel bookings
✅ View booking history
✅ Cancel bookings
✅ User dashboard

### Admin Features
✅ Admin authentication
✅ Add/Edit/Delete hotels
✅ View all bookings
✅ Manage hotel inventory
✅ Analytics dashboard
✅ Revenue tracking

### System Features
✅ Responsive design
✅ Real-time chatbot
✅ JWT authentication
✅ MongoDB integration
✅ Error handling
✅ Data validation

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

## Testing

To run the test suite:
```bash
cd backend
npm test
```

## Project Structure

```
Mini_project_hotel_room_booking_system/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Database scripts
│   └── server.js          # Main server file
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   └── utils/        # Utility functions
│   └── package.json
├── start.bat              # Windows startup script
└── README.md             # This file
```

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

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check the console for error messages
5. Verify environment variables are set correctly

## License

This project is for educational purposes.
