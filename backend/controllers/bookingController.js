const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests, rooms, specialRequests } = req.body;

    // Check if hotel exists and has available rooms
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ msg: 'Hotel not found' });
    }

    if (hotel.availableRooms < rooms) {
      return res.status(400).json({ msg: 'Not enough rooms available' });
    }

    // Calculate total price
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = hotel.price * rooms * nights;

    // Create booking
    const booking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      checkIn,
      checkOut,
      guests,
      rooms,
      totalPrice,
      specialRequests
    });

    await booking.save();

    // Update hotel available rooms
    hotel.availableRooms -= rooms;
    hotel.calculateOccupancyRate();
    await hotel.save();

    // Populate booking with hotel details
    await booking.populate('hotel', 'name location price');

    res.status(201).json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hotel', 'name location price images')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('hotel', 'name location price images')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Check if user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Check if booking can be cancelled (not already cancelled or completed)
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({ msg: 'Booking cannot be cancelled' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Return rooms to hotel
    const hotel = await Hotel.findById(booking.hotel);
    hotel.availableRooms += booking.rooms;
    hotel.calculateOccupancyRate();
    await hotel.save();

    res.json({ msg: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all bookings (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('hotel', 'name location')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings
};
