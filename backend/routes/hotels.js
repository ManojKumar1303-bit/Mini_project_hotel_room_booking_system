const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { auth, adminAuth } = require('../middleware/auth');
const upload = require('../config/upload');

// GET all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
});

// GET recommended hotels (simple example: top rated or latest)
router.get('/recommended', async (req, res) => {
  try {
    // Simple heuristic: sort by rating desc, then createdAt desc, limit 6
    const hotels = await Hotel.find().sort({ rating: -1, createdAt: -1 }).limit(6);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recommended hotels' });
  }
});

// POST upload hotel images (Admin only)
router.post('/upload-images', auth, adminAuth, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/hotels/${file.filename}`);
    res.json({ 
      message: 'Images uploaded successfully', 
      images: imageUrls 
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
});

// POST add hotel (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    // Validate required fields
    const { name, location, description, price, availableRooms, totalRooms } = req.body;
    
    if (!name || !location?.city || !location?.address || !description || !price || !availableRooms || !totalRooms) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        required: ['name', 'location.city', 'location.address', 'description', 'price', 'availableRooms', 'totalRooms']
      });
    }

    // Validate numeric fields
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }
    
    if (isNaN(availableRooms) || availableRooms < 0) {
      return res.status(400).json({ message: 'Available rooms must be a valid non-negative number' });
    }
    
    if (isNaN(totalRooms) || totalRooms < 0) {
      return res.status(400).json({ message: 'Total rooms must be a valid non-negative number' });
    }

    if (availableRooms > totalRooms) {
      return res.status(400).json({ message: 'Available rooms cannot exceed total rooms' });
    }

    const hotelData = {
      ...req.body,
      price: parseFloat(price),
      availableRooms: parseInt(availableRooms),
      totalRooms: parseInt(totalRooms),
      amenities: Array.isArray(req.body.amenities) ? req.body.amenities : 
                 (typeof req.body.amenities === 'string' ? req.body.amenities.split(',').map(a => a.trim()).filter(a => a) : []),
      images: Array.isArray(req.body.images) ? req.body.images : []
    };

    const hotel = new Hotel(hotelData);
    await hotel.save();
    
    // Calculate occupancy rate
    hotel.calculateOccupancyRate();
    await hotel.save();
    
    res.status(201).json(hotel);
  } catch (err) {
    console.error("Error saving hotel:", err);
    res.status(400).json({ 
      message: 'Failed to add hotel', 
      error: err.message,
      details: err.errors ? Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      })) : []
    });
  }
});

// PUT update hotel (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update hotel' });
  }
});

// DELETE hotel (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete hotel' });
  }
});

module.exports = router;
