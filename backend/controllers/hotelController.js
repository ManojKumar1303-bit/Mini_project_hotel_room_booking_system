const Hotel = require('../models/Hotel');
const User = require('../models/User');

// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ msg: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Create hotel (Admin only)
const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update hotel (Admin only)
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!hotel) {
      return res.status(404).json({ msg: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete hotel (Admin only)
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ msg: 'Hotel not found' });
    }
    res.json({ msg: 'Hotel deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get recommended hotels based on user preferences
const getRecommendedHotels = async (req, res) => {
  try {
    const user = req.user;
    const userDoc = await User.findById(user.id);
    
    if (!userDoc.preferences) {
      // Return random hotels if no preferences
      const hotels = await Hotel.find().limit(5);
      return res.json(hotels);
    }

    const { locations, budgetRange } = userDoc.preferences;
    let query = {};

    // Filter by location if user has location preferences
    if (locations && locations.length > 0) {
      query['location.city'] = { $in: locations };
    }

    // Filter by budget range
    if (budgetRange && budgetRange.min && budgetRange.max) {
      query.price = {
        $gte: budgetRange.min,
        $lte: budgetRange.max
      };
    }

    const recommendedHotels = await Hotel.find(query).limit(5);
    res.json(recommendedHotels);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getRecommendedHotels
};
