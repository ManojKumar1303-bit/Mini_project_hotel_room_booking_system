import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const [hotelForm, setHotelForm] = useState({
    name: '',
    location: { city: '', address: '' },
    description: '',
    price: '',
    availableRooms: '',
    totalRooms: '',
    amenities: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [hotelsRes, bookingsRes, dashboardRes] = await Promise.all([
        api.get('/hotels'),
        api.get('/bookings/all'),
        api.get('/admin/dashboard')
      ]);
      
      setHotels(hotelsRes.data);
      setBookings(bookingsRes.data);
      setDashboardData(dashboardRes.data);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      const hotelData = {
        ...hotelForm,
        price: parseInt(hotelForm.price),
        availableRooms: parseInt(hotelForm.availableRooms),
        totalRooms: parseInt(hotelForm.totalRooms),
        amenities: hotelForm.amenities.split(',').map(a => a.trim()).filter(a => a)
      };

      if (editingHotel) {
        await api.put(`/hotels/${editingHotel._id}`, hotelData);
        setEditingHotel(null);
      } else {
        await api.post('/hotels', hotelData);
      }

      setShowAddHotel(false);
      setHotelForm({
        name: '',
        location: { city: '', address: '' },
        description: '',
        price: '',
        availableRooms: '',
        totalRooms: '',
        amenities: []
      });
      fetchData();
    } catch (error) {
      alert('Failed to save hotel');
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await api.delete(`/hotels/${hotelId}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete hotel');
      }
    }
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setHotelForm({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      price: hotel.price.toString(),
      availableRooms: hotel.availableRooms.toString(),
      totalRooms: hotel.totalRooms.toString(),
      amenities: hotel.amenities.join(', ')
    });
    setShowAddHotel(true);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h3>Loading admin dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage hotels, bookings, and system analytics</p>
        <div className="d-flex gap-2">
          <button 
            onClick={() => setShowAddHotel(true)}
            className="btn btn-primary"
          >
            Add New Hotel
          </button>
          <Link to="/admin/analytics" className="btn btn-success">
            View Analytics
          </Link>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {/* Dashboard Stats */}
      {dashboardData && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{dashboardData.stats.totalHotels}</div>
            <div className="stat-label">Total Hotels</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{dashboardData.stats.totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{dashboardData.stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${dashboardData.stats.totalRevenue}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
      )}

      {/* Add/Edit Hotel Form */}
      {showAddHotel && (
        <div className="card mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h3>
            <button 
              onClick={() => {
                setShowAddHotel(false);
                setEditingHotel(null);
                setHotelForm({
                  name: '',
                  location: { city: '', address: '' },
                  description: '',
                  price: '',
                  availableRooms: '',
                  totalRooms: '',
                  amenities: ''
                });
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleHotelSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Hotel Name</label>
                <input
                  type="text"
                  value={hotelForm.name}
                  onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={hotelForm.location.city}
                  onChange={(e) => setHotelForm({ 
                    ...hotelForm, 
                    location: { ...hotelForm.location, city: e.target.value }
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={hotelForm.location.address}
                  onChange={(e) => setHotelForm({ 
                    ...hotelForm, 
                    location: { ...hotelForm.location, address: e.target.value }
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Night ($)</label>
                <input
                  type="number"
                  value={hotelForm.price}
                  onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Available Rooms</label>
                <input
                  type="number"
                  value={hotelForm.availableRooms}
                  onChange={(e) => setHotelForm({ ...hotelForm, availableRooms: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total Rooms</label>
                <input
                  type="number"
                  value={hotelForm.totalRooms}
                  onChange={(e) => setHotelForm({ ...hotelForm, totalRooms: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={hotelForm.description}
                onChange={(e) => setHotelForm({ ...hotelForm, description: e.target.value })}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label>Amenities (comma-separated)</label>
              <input
                type="text"
                value={hotelForm.amenities}
                onChange={(e) => setHotelForm({ ...hotelForm, amenities: e.target.value })}
                placeholder="WiFi, Parking, Pool, Gym, Restaurant"
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              {editingHotel ? 'Update Hotel' : 'Add Hotel'}
            </button>
          </form>
        </div>
      )}

      {/* Hotels Management */}
      <div className="card mb-4">
        <h3>Hotels Management</h3>
        <div className="grid grid-2">
          {hotels.map(hotel => (
            <div key={hotel._id} className="hotel-card">
              <div className="hotel-content">
                <h4>{hotel.name}</h4>
                <p>📍 {hotel.location.city}, {hotel.location.address}</p>
                <p>💰 ${hotel.price}/night</p>
                <p>🏨 {hotel.availableRooms}/{hotel.totalRooms} rooms available</p>
                <p>📊 Occupancy: {hotel.occupancyRate?.toFixed(1)}%</p>
                <div className="d-flex gap-2">
                  <button 
                    onClick={() => handleEditHotel(hotel)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteHotel(hotel._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h3>Recent Bookings</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {bookings.slice(0, 10).map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h4>{booking.hotel?.name}</h4>
                <span className={`booking-status status-${booking.status}`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-2">
                <div>
                  <p><strong>User:</strong> {booking.user?.name}</p>
                  <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                </div>
                <div>
                  <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ${booking.totalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
