# 🏨 Hotel Booking System - Backend

Express.js backend API for the Hotel Booking System with MongoDB, JWT authentication, and comprehensive admin features.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hotel-booking
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

3. **Seed the database with sample data**
   ```bash
   node scripts/seedData.js
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── hotelController.js   # Hotel management logic
│   └── bookingController.js # Booking management logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User schema and methods
│   ├── Hotel.js             # Hotel schema and methods
│   └── Booking.js           # Booking schema and methods
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── hotels.js            # Hotel routes
│   ├── bookings.js          # Booking routes
│   └── admin.js             # Admin routes
├── scripts/
│   └── seedData.js          # Database seeding script
├── package.json
└── server.js                # Main server file
```

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

### Hotel Routes (`/api/hotels`)
- `GET /` - Get all hotels
- `GET /:id` - Get hotel by ID
- `GET /recommended` - Get recommended hotels (protected)
- `POST /` - Create hotel (admin only)
- `PUT /:id` - Update hotel (admin only)
- `DELETE /:id` - Delete hotel (admin only)

### Booking Routes (`/api/bookings`)
- `POST /` - Create booking (protected)
- `GET /` - Get user bookings (protected)
- `GET /all` - Get all bookings (admin only)
- `GET /:id` - Get booking by ID (protected)
- `PUT /:id/cancel` - Cancel booking (protected)

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get dashboard data (admin only)
- `GET /analytics` - Get analytics data (admin only)

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  preferences: {
    locations: [String],
    budgetRange: { min: Number, max: Number },
    amenities: [String]
  }
}
```

### Hotel Model
```javascript
{
  name: String,
  location: {
    city: String,
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  description: String,
  price: Number,
  availableRooms: Number,
  totalRooms: Number,
  amenities: [String],
  images: [String],
  rating: Number,
  occupancyRate: Number
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: User),
  hotel: ObjectId (ref: Hotel),
  checkIn: Date,
  checkOut: Date,
  guests: {
    adults: Number,
    children: Number
  },
  rooms: Number,
  totalPrice: Number,
  status: String (pending/confirmed/cancelled/completed),
  paymentStatus: String (pending/paid/refunded),
  specialRequests: String
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Registration/Login**: Returns a JWT token
2. **Protected Routes**: Require `x-auth-token` header
3. **Token Expiry**: 7 days
4. **Role-based Access**: Admin routes require admin role

### Example Usage
```javascript
// Include token in requests
headers: {
  'x-auth-token': 'your-jwt-token-here'
}
```

## 🤖 AI Recommendation System

The recommendation system analyzes user preferences:

1. **Location Preferences**: Based on past bookings
2. **Budget Range**: User's preferred price range
3. **Amenities**: Preferred hotel amenities
4. **Booking Patterns**: Historical booking data

### Recommendation Algorithm
```javascript
// Simple rule-based system
const query = {};
if (locations && locations.length > 0) {
  query['location.city'] = { $in: locations };
}
if (budgetRange) {
  query.price = {
    $gte: budgetRange.min,
    $lte: budgetRange.max
  };
}
```

## 📊 Analytics Features

### Dashboard Metrics
- Total hotels count
- Total bookings count
- Total users count
- Total revenue

### Analytics Data
- Hotel occupancy rates
- Bookings per hotel
- Seasonal demand trends
- Revenue analysis

## 🛠️ Development

### Scripts
```bash
npm start     # Start production server
npm run dev   # Start development server with nodemon
```

### Database Operations
```bash
# Seed sample data
node scripts/seedData.js

# Clear database (manual)
# Use MongoDB Compass or mongo shell
```

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB Atlas or cloud MongoDB
2. Update `MONGODB_URI` with production connection string
3. Set secure `JWT_SECRET`
4. Configure `PORT` (usually 5000 or environment variable)

### Deployment Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with built-in MongoDB
- **DigitalOcean**: VPS deployment with Docker
- **AWS**: EC2 with MongoDB Atlas

### Production Considerations
- Use environment variables for sensitive data
- Enable CORS for your frontend domain
- Set up proper error logging
- Use HTTPS in production
- Implement rate limiting
- Set up database backups

## 🧪 Testing

### Manual Testing
Use tools like Postman or curl to test endpoints:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get hotels (with token)
curl -X GET http://localhost:5000/api/hotels \
  -H "x-auth-token: your-jwt-token"
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiry
   - Ensure proper header format

3. **CORS Errors**
   - Verify frontend URL in CORS settings
   - Check request headers
   - Ensure proper preflight handling

4. **Database Seeding Issues**
   - Check MongoDB connection
   - Verify database permissions
   - Clear existing data if needed

## 📝 API Documentation

### Request/Response Examples

#### Register User
```javascript
// Request
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

// Response
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Create Booking
```javascript
// Request
POST /api/bookings
{
  "hotelId": "hotel-id",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": {
    "adults": 2,
    "children": 1
  },
  "rooms": 1,
  "specialRequests": "Late checkout please"
}

// Response
{
  "_id": "booking-id",
  "user": "user-id",
  "hotel": {
    "_id": "hotel-id",
    "name": "Hotel Name",
    "location": {...},
    "price": 200
  },
  "checkIn": "2024-01-15T00:00:00.000Z",
  "checkOut": "2024-01-18T00:00:00.000Z",
  "guests": {...},
  "rooms": 1,
  "totalPrice": 600,
  "status": "pending",
  "paymentStatus": "pending"
}
```

---

**Backend API Documentation for Hotel Booking System**
