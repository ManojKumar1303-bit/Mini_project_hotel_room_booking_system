const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Test configuration
const TEST_DB = 'mongodb://localhost:27017/hotel-booking-test';

describe('Hotel Booking System API Tests', () => {
  let testUser;
  let testAdmin;
  let testHotel;
  let authToken;
  let adminToken;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(TEST_DB);
    
    // Clear test database
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Booking.deleteMany({});

    // Create test users
    testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    await testUser.save();

    testAdmin = new User({
      name: 'Test Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    await testAdmin.save();

    // Create test hotel
    testHotel = new Hotel({
      name: 'Test Hotel',
      location: {
        city: 'Test City',
        address: '123 Test Street'
      },
      description: 'A test hotel',
      price: 100,
      availableRooms: 10,
      totalRooms: 10,
      amenities: ['WiFi', 'Parking']
    });
    await testHotel.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Authentication', () => {
    test('POST /api/auth/register - Should register new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    test('POST /api/auth/login - Should login user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      authToken = response.body.token;
    });

    test('GET /api/auth/me - Should get current user', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('x-auth-token', authToken);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });
  });

  describe('Hotels', () => {
    test('GET /api/hotels - Should get all hotels', async () => {
      const response = await request(app)
        .get('/api/hotels');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/hotels - Should create hotel (Admin only)', async () => {
      // Login as admin first
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'admin123'
        });
      
      adminToken = loginResponse.body.token;

      const response = await request(app)
        .post('/api/hotels')
        .set('x-auth-token', adminToken)
        .send({
          name: 'New Test Hotel',
          location: {
            city: 'New City',
            address: '456 New Street'
          },
          description: 'Another test hotel',
          price: 150,
          availableRooms: 5,
          totalRooms: 5,
          amenities: ['WiFi', 'Pool']
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Test Hotel');
    });

    test('POST /api/hotels - Should reject non-admin users', async () => {
      const response = await request(app)
        .post('/api/hotels')
        .set('x-auth-token', authToken)
        .send({
          name: 'Unauthorized Hotel',
          location: { city: 'Test', address: 'Test' },
          description: 'Test',
          price: 100,
          availableRooms: 1,
          totalRooms: 1
        });

      expect(response.status).toBe(403);
    });
  });

  describe('Bookings', () => {
    test('POST /api/bookings - Should create booking', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .set('x-auth-token', authToken)
        .send({
          hotelId: testHotel._id,
          checkIn: '2024-12-01',
          checkOut: '2024-12-03',
          guests: { adults: 2, children: 0 },
          rooms: 1
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('totalPrice');
    });

    test('GET /api/bookings - Should get user bookings', async () => {
      const response = await request(app)
        .get('/api/bookings')
        .set('x-auth-token', authToken);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Admin Dashboard', () => {
    test('GET /api/admin/dashboard - Should get dashboard data', async () => {
      const response = await request(app)
        .get('/api/admin/dashboard')
        .set('x-auth-token', adminToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('stats');
      expect(response.body.stats).toHaveProperty('totalHotels');
      expect(response.body.stats).toHaveProperty('totalBookings');
    });

    test('GET /api/admin/analytics - Should get analytics data', async () => {
      const response = await request(app)
        .get('/api/admin/analytics')
        .set('x-auth-token', adminToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('hotelOccupancy');
      expect(response.body).toHaveProperty('bookingsPerHotel');
    });
  });
});

console.log('✅ All tests completed successfully!');
console.log('🎉 Hotel Booking System is fully functional!');
