const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');

// Test hotel data
const testHotelData = {
  name: 'Test Hotel Fix',
  location: {
    city: 'Test City',
    address: '123 Test Street'
  },
  description: 'A test hotel to verify the fix',
  price: 150,
  availableRooms: 10,
  totalRooms: 15,
  amenities: ['WiFi', 'Parking', 'Pool'],
  images: []
};

async function testHotelCreation() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/hotel-booking');
    console.log('Connected to MongoDB');

    // Clear any existing test hotel
    await Hotel.deleteOne({ name: 'Test Hotel Fix' });

    // Create new hotel
    const hotel = new Hotel(testHotelData);
    await hotel.save();
    
    // Calculate occupancy rate
    hotel.calculateOccupancyRate();
    await hotel.save();

    console.log('✅ Hotel created successfully!');
    console.log('Hotel ID:', hotel._id);
    console.log('Hotel Name:', hotel.name);
    console.log('Price:', hotel.price);
    console.log('Available Rooms:', hotel.availableRooms);
    console.log('Total Rooms:', hotel.totalRooms);
    console.log('Occupancy Rate:', hotel.occupancyRate);
    console.log('Amenities:', hotel.amenities);

    // Verify the hotel was saved correctly
    const savedHotel = await Hotel.findById(hotel._id);
    if (savedHotel) {
      console.log('✅ Hotel verification successful!');
    } else {
      console.log('❌ Hotel verification failed!');
    }

  } catch (error) {
    console.error('❌ Error creating hotel:', error.message);
    if (error.errors) {
      console.error('Validation errors:', Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })));
    }
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

testHotelCreation();
