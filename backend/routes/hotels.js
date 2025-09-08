const express = require('express');
const router = express.Router();
const { 
  getHotels, 
  getHotelById, 
  createHotel, 
  updateHotel, 
  deleteHotel,
  getRecommendedHotels 
} = require('../controllers/hotelController');
const { auth, adminAuth } = require('../middleware/auth');

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', getHotels);

// @route   GET /api/hotels/recommended
// @desc    Get recommended hotels for user
// @access  Private
router.get('/recommended', auth, getRecommendedHotels);

// @route   GET /api/hotels/:id
// @desc    Get hotel by ID
// @access  Public
router.get('/:id', getHotelById);

// @route   POST /api/hotels
// @desc    Create hotel
// @access  Private (Admin only)
router.post('/', auth, adminAuth, createHotel);

// @route   PUT /api/hotels/:id
// @desc    Update hotel
// @access  Private (Admin only)
router.put('/:id', auth, adminAuth, updateHotel);

// @route   DELETE /api/hotels/:id
// @desc    Delete hotel
// @access  Private (Admin only)
router.delete('/:id', auth, adminAuth, deleteHotel);

module.exports = router;
