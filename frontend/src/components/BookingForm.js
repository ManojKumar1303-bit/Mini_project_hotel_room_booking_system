import React, { useState } from 'react';
import api from '../utils/api';

const BookingForm = ({ hotel, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    rooms: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return hotel.price * formData.rooms * nights;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        hotelId: hotel._id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: {
          adults: parseInt(formData.adults),
          children: parseInt(formData.children)
        },
        rooms: parseInt(formData.rooms),
        specialRequests: formData.specialRequests
      };

      await api.post('/bookings', bookingData);
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.msg || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Book {hotel.name}</h3>
          <button onClick={onClose} className="btn btn-secondary">✕</button>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Check-in Date</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="d-flex gap-3">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Adults</label>
              <select
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Children</label>
              <select
                name="children"
                value={formData.children}
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Rooms</label>
              <select
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                max={hotel.availableRooms}
                required
              >
                {Array.from({ length: Math.min(hotel.availableRooms, 5) }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Special Requests (Optional)</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
              placeholder="Any special requests or requirements..."
            />
          </div>

          {totalPrice > 0 && (
            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '20px'
            }}>
              <div className="d-flex justify-content-between">
                <span>Total Price:</span>
                <strong style={{ color: '#007bff', fontSize: '1.2rem' }}>
                  ${totalPrice}
                </strong>
              </div>
            </div>
          )}

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading || totalPrice === 0}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
