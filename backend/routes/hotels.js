const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

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

// POST add hotel
// POST add hotel
router.post('/', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    console.error("Error saving hotel:", err.message);
    res.status(400).json({ message: 'Failed to add hotel', error: err.message });
  }
});


// PUT update hotel
router.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update hotel' });
  }
});

// DELETE hotel
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete hotel' });
  }
});

module.exports = router;
