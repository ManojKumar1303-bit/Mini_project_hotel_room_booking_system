import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.put(`/bookings/${bookingId}/cancel`);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
        alert('Booking cancelled successfully');
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h3>Loading dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Manage your hotel bookings and preferences</p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{bookings.length}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {bookings.filter(b => b.status === 'confirmed').length}
          </div>
          <div className="stat-label">Confirmed Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {bookings.filter(b => b.status === 'pending').length}
          </div>
          <div className="stat-label">Pending Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}
          </div>
          <div className="stat-label">Total Spent</div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Your Bookings</h2>
        
        {bookings.length === 0 ? (
          <div className="card text-center">
            <h3>No bookings yet</h3>
            <p>Start exploring our hotels and make your first booking!</p>
            <a href="/hotels" className="btn btn-primary">Browse Hotels</a>
          </div>
        ) : (
          <div>
            {bookings.map(booking => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.hotel?.name}</h3>
                  <span className={`booking-status ${getStatusColor(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-2">
                  <div>
                    <p><strong>Location:</strong> {booking.hotel?.location?.city}</p>
                    <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p><strong>Guests:</strong> {booking.guests.adults} adults, {booking.guests.children} children</p>
                    <p><strong>Rooms:</strong> {booking.rooms}</p>
                    <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div style={{ marginTop: '15px' }}>
                    <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                  </div>
                )}
                
                <div style={{ marginTop: '15px' }}>
                  <button 
                    onClick={() => handleCancelBooking(booking._id)}
                    className="btn btn-danger"
                    disabled={booking.status === 'cancelled' || booking.status === 'completed'}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
