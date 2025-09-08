const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  getBookingById, 
  cancelBooking,
  getAllBookings 
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create booking
// @access  Private
router.post('/', auth, createBooking);

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', auth, getUserBookings);

// @route   GET /api/bookings/all
// @desc    Get all bookings (Admin only)
// @access  Private (Admin only)
router.get('/all', auth, adminAuth, getAllBookings);

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', auth, getBookingById);

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', auth, cancelBooking);

module.exports = router;
