const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Booking.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@hotelbooking.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create regular users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        preferences: {
          locations: ['Delhi', 'Mumbai'],
          budgetRange: { min: 100, max: 300 },
          amenities: ['WiFi', 'Parking', 'Pool']
        }
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        preferences: {
          locations: ['Bangalore', 'Chennai'],
          budgetRange: { min: 150, max: 400 },
          amenities: ['Gym', 'Restaurant', 'Spa']
        }
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123',
        preferences: {
          locations: ['Goa', 'Pune'],
          budgetRange: { min: 80, max: 250 },
          amenities: ['Beach Access', 'Water Sports']
        }
      }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log('Created regular users');

    // Create hotels
    const hotels = [
      {
        name: 'Taj Palace Delhi',
        location: {
          city: 'Delhi',
          address: '2, Sardar Patel Marg, Diplomatic Enclave'
        },
        description: 'Luxury hotel in the heart of Delhi with world-class amenities and exceptional service.',
        price: 250,
        availableRooms: 45,
        totalRooms: 50,
        amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Room Service'],
        images: ['https://via.placeholder.com/400x300?text=Taj+Palace+Delhi'],
        rating: 4.8
      },
      {
        name: 'Oberoi Mumbai',
        location: {
          city: 'Mumbai',
          address: 'Nariman Point, Marine Drive'
        },
        description: 'Iconic luxury hotel overlooking the Arabian Sea with breathtaking views.',
        price: 300,
        availableRooms: 30,
        totalRooms: 35,
        amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Concierge'],
        images: ['https://via.placeholder.com/400x300?text=Oberoi+Mumbai'],
        rating: 4.9
      },
      {
        name: 'ITC Gardenia Bangalore',
        location: {
          city: 'Bangalore',
          address: 'Residency Road, Richmond Town'
        },
        description: 'Modern business hotel with excellent facilities for corporate travelers.',
        price: 180,
        availableRooms: 60,
        totalRooms: 70,
        amenities: ['WiFi', 'Parking', 'Business Center', 'Gym', 'Restaurant', 'Meeting Rooms'],
        images: ['https://via.placeholder.com/400x300?text=ITC+Gardenia'],
        rating: 4.6
      },
      {
        name: 'Leela Palace Chennai',
        location: {
          city: 'Chennai',
          address: 'Adyar, Guindy'
        },
        description: 'Elegant palace hotel with traditional South Indian architecture and modern amenities.',
        price: 220,
        availableRooms: 40,
        totalRooms: 45,
        amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Cultural Shows'],
        images: ['https://via.placeholder.com/400x300?text=Leela+Palace'],
        rating: 4.7
      },
      {
        name: 'Taj Exotica Goa',
        location: {
          city: 'Goa',
          address: 'Benaulim Beach, South Goa'
        },
        description: 'Beachfront resort with pristine beaches and tropical paradise setting.',
        price: 200,
        availableRooms: 55,
        totalRooms: 60,
        amenities: ['WiFi', 'Parking', 'Beach Access', 'Water Sports', 'Pool', 'Restaurant', 'Spa'],
        images: ['https://via.placeholder.com/400x300?text=Taj+Exotica+Goa'],
        rating: 4.5
      },
      {
        name: 'JW Marriott Pune',
        location: {
          city: 'Pune',
          address: 'Senapati Bapat Road, Koregaon Park'
        },
        description: 'Contemporary hotel in Pune\'s business district with excellent connectivity.',
        price: 160,
        availableRooms: 50,
        totalRooms: 55,
        amenities: ['WiFi', 'Parking', 'Business Center', 'Gym', 'Restaurant', 'Meeting Rooms'],
        images: ['https://via.placeholder.com/400x300?text=JW+Marriott+Pune'],
        rating: 4.4
      },
      {
        name: 'Hyatt Regency Kolkata',
        location: {
          city: 'Kolkata',
          address: 'JA Block, Sector III, Salt Lake'
        },
        description: 'Modern hotel in Kolkata\'s business district with excellent facilities.',
        price: 140,
        availableRooms: 35,
        totalRooms: 40,
        amenities: ['WiFi', 'Parking', 'Business Center', 'Gym', 'Restaurant', 'Meeting Rooms'],
        images: ['https://via.placeholder.com/400x300?text=Hyatt+Regency'],
        rating: 4.3
      },
      {
        name: 'Park Hyatt Hyderabad',
        location: {
          city: 'Hyderabad',
          address: 'Road No. 2, Banjara Hills'
        },
        description: 'Luxury hotel in Hyderabad with contemporary design and exceptional service.',
        price: 190,
        availableRooms: 25,
        totalRooms: 30,
        amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Concierge'],
        images: ['https://via.placeholder.com/400x300?text=Park+Hyatt'],
        rating: 4.6
      }
    ];

    const createdHotels = [];
    for (const hotelData of hotels) {
      const hotel = new Hotel(hotelData);
      hotel.calculateOccupancyRate();
      await hotel.save();
      createdHotels.push(hotel);
    }
    console.log('Created hotels');

    // Create sample bookings
    const bookings = [
      {
        user: createdUsers[0]._id,
        hotel: createdHotels[0]._id,
        checkIn: new Date('2024-01-15'),
        checkOut: new Date('2024-01-18'),
        guests: { adults: 2, children: 1 },
        rooms: 1,
        totalPrice: 750,
        status: 'confirmed',
        paymentStatus: 'paid'
      },
      {
        user: createdUsers[1]._id,
        hotel: createdHotels[1]._id,
        checkIn: new Date('2024-02-10'),
        checkOut: new Date('2024-02-12'),
        guests: { adults: 2, children: 0 },
        rooms: 1,
        totalPrice: 600,
        status: 'confirmed',
        paymentStatus: 'paid'
      },
      {
        user: createdUsers[2]._id,
        hotel: createdHotels[4]._id,
        checkIn: new Date('2024-03-05'),
        checkOut: new Date('2024-03-08'),
        guests: { adults: 2, children: 2 },
        rooms: 1,
        totalPrice: 600,
        status: 'pending',
        paymentStatus: 'pending'
      },
      {
        user: createdUsers[0]._id,
        hotel: createdHotels[2]._id,
        checkIn: new Date('2024-01-20'),
        checkOut: new Date('2024-01-22'),
        guests: { adults: 1, children: 0 },
        rooms: 1,
        totalPrice: 360,
        status: 'completed',
        paymentStatus: 'paid'
      },
      {
        user: createdUsers[1]._id,
        hotel: createdHotels[3]._id,
        checkIn: new Date('2024-02-15'),
        checkOut: new Date('2024-02-17'),
        guests: { adults: 2, children: 0 },
        rooms: 1,
        totalPrice: 440,
        status: 'confirmed',
        paymentStatus: 'paid'
      }
    ];

    for (const bookingData of bookings) {
      const booking = new Booking(bookingData);
      await booking.save();
    }
    console.log('Created sample bookings');

    console.log('✅ Seed data created successfully!');
    console.log('\n📋 Sample Accounts:');
    console.log('Admin: admin@hotelbooking.com / admin123');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123');
    console.log('User: mike@example.com / password123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
connectDB().then(() => {
  seedData();
});
