const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availableRooms: {
    type: Number,
    required: true,
    min: 0
  },
  totalRooms: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [String],
  images: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  occupancyRate: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate occupancy rate
hotelSchema.methods.calculateOccupancyRate = function() {
  if (this.totalRooms === 0) return 0;
  const occupiedRooms = this.totalRooms - this.availableRooms;
  this.occupancyRate = (occupiedRooms / this.totalRooms) * 100;
  return this.occupancyRate;
};

module.exports = mongoose.model('Hotel', hotelSchema);
