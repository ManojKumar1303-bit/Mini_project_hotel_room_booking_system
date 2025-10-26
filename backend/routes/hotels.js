const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { auth, adminAuth } = require('../middleware/auth');

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

// POST add hotel (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    console.error("Error saving hotel:", err.message);
    res.status(400).json({ message: 'Failed to add hotel', error: err.message });
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
