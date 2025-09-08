import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingForm from './BookingForm';

const HotelCard = ({ hotel }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    alert('Booking created successfully!');
  };

  return (
    <>
      <div className="hotel-card">
        <img 
          src={hotel.images?.[0] || 'https://via.placeholder.com/300x200?text=Hotel+Image'} 
          alt={hotel.name}
          className="hotel-image"
        />
        <div className="hotel-content">
          <h3 className="hotel-name">{hotel.name}</h3>
          <p className="hotel-location">📍 {hotel.location.city}, {hotel.location.address}</p>
          <p className="hotel-price">${hotel.price}/night</p>
          <p style={{ color: '#666', marginBottom: '15px' }}>{hotel.description}</p>
          
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="hotel-amenities">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="amenity-tag">+{hotel.amenities.length - 3} more</span>
              )}
            </div>
          )}
          
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span style={{ color: '#666' }}>
                Available Rooms: {hotel.availableRooms}
              </span>
            </div>
            <button 
              onClick={handleBookNow}
              className="btn btn-primary"
              disabled={hotel.availableRooms === 0}
            >
              {hotel.availableRooms === 0 ? 'No Rooms Available' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          hotel={hotel}
          onClose={() => setShowBookingForm(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </>
  );
};

export default HotelCard;
