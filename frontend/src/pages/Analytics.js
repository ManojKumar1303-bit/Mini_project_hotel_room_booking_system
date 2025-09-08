import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/admin/analytics');
      setAnalyticsData(response.data);
    } catch (error) {
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  const formatSeasonalData = (seasonalDemand) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return seasonalDemand.map(item => ({
      month: monthNames[item._id - 1],
      bookings: item.bookings,
      revenue: item.revenue
    }));
  };

  const formatHotelOccupancyData = (hotels) => {
    return hotels.map(hotel => ({
      name: hotel.name.length > 15 ? hotel.name.substring(0, 15) + '...' : hotel.name,
      occupancy: hotel.occupancyRate || 0,
      availableRooms: hotel.availableRooms,
      totalRooms: hotel.totalRooms
    }));
  };

  const formatBookingsPerHotelData = (bookingsPerHotel) => {
    return bookingsPerHotel.map(item => ({
      name: item.hotelName?.[0]?.name || 'Unknown Hotel',
      bookings: item.bookingCount,
      revenue: item.totalRevenue
    }));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h3>Loading analytics...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <Link to="/admin" className="btn btn-primary">Back to Admin Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p>Comprehensive analytics and insights for your hotel business</p>
        <Link to="/admin" className="btn btn-secondary">Back to Admin Dashboard</Link>
      </div>

      {/* Hotel Occupancy Rates */}
      <div className="card mb-4">
        <h3>Hotel Occupancy Rates</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatHotelOccupancyData(analyticsData.hotelOccupancy)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupancy" fill="#8884d8" name="Occupancy Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bookings per Hotel */}
      <div className="card mb-4">
        <h3>Bookings per Hotel</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatBookingsPerHotelData(analyticsData.bookingsPerHotel)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#82ca9d" name="Number of Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue per Hotel */}
      <div className="card mb-4">
        <h3>Revenue per Hotel</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatBookingsPerHotelData(analyticsData.bookingsPerHotel)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
            <Legend />
            <Bar dataKey="revenue" fill="#ffc658" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Seasonal Demand */}
      <div className="card mb-4">
        <h3>Seasonal Demand Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatSeasonalData(analyticsData.seasonalDemand)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="bookings" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Bookings"
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hotel Performance Summary */}
      <div className="grid grid-2">
        <div className="card">
          <h3>Top Performing Hotels</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {analyticsData.bookingsPerHotel
              .sort((a, b) => b.bookingCount - a.bookingCount)
              .slice(0, 5)
              .map((hotel, index) => (
                <div key={index} style={{ 
                  padding: '10px', 
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{hotel.hotelName?.[0]?.name || 'Unknown Hotel'}</strong>
                    <br />
                    <small>{hotel.bookingCount} bookings</small>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>${hotel.totalRevenue}</strong>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="card">
          <h3>Occupancy Summary</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {analyticsData.hotelOccupancy
              .sort((a, b) => (b.occupancyRate || 0) - (a.occupancyRate || 0))
              .map((hotel, index) => (
                <div key={index} style={{ 
                  padding: '10px', 
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{hotel.name}</strong>
                    <br />
                    <small>{hotel.availableRooms}/{hotel.totalRooms} rooms available</small>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>{(hotel.occupancyRate || 0).toFixed(1)}%</strong>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="card">
        <h3>Key Performance Indicators</h3>
        <div className="grid grid-4">
          <div className="stat-card">
            <div className="stat-number">
              {analyticsData.hotelOccupancy.reduce((sum, hotel) => sum + (hotel.occupancyRate || 0), 0) / analyticsData.hotelOccupancy.length || 0}
            </div>
            <div className="stat-label">Avg Occupancy Rate (%)</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {analyticsData.bookingsPerHotel.reduce((sum, hotel) => sum + hotel.bookingCount, 0)}
            </div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              ${analyticsData.bookingsPerHotel.reduce((sum, hotel) => sum + hotel.totalRevenue, 0)}
            </div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {analyticsData.hotelOccupancy.length}
            </div>
            <div className="stat-label">Total Hotels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
