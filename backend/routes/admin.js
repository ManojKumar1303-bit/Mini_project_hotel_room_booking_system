const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const User = require('../models/User');

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const totalHotels = await Hotel.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalRevenue = await Booking.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Get hotel occupancy rates
    const hotels = await Hotel.find().select('name occupancyRate totalRooms availableRooms');
    
    // Get monthly bookings
    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      stats: {
        totalHotels,
        totalBookings,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      hotels,
      monthlyBookings
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed analytics
// @access  Private (Admin only)
router.get('/analytics', auth, adminAuth, async (req, res) => {
  try {
    // Hotel occupancy rates
    const hotelOccupancy = await Hotel.find().select('name occupancyRate totalRooms availableRooms');
    
    // Bookings per hotel
    const bookingsPerHotel = await Booking.aggregate([
      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel',
          foreignField: '_id',
          as: 'hotelInfo'
        }
      },
      {
        $group: {
          _id: '$hotel',
          hotelName: { $first: '$hotelInfo.name' },
          bookingCount: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    // Seasonal demand (by month)
    const seasonalDemand = await Booking.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      hotelOccupancy,
      bookingsPerHotel,
      seasonalDemand
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
