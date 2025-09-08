import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchHotels();
    if (isAuthenticated) {
      fetchRecommendedHotels();
    }
  }, [isAuthenticated]);

  const fetchHotels = async () => {
    try {
      const response = await api.get('/hotels');
      setHotels(response.data);
    } catch (error) {
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedHotels = async () => {
    try {
      const response = await api.get('/hotels/recommended');
      setRecommendedHotels(response.data);
    } catch (error) {
      console.error('Failed to fetch recommended hotels:', error);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = (!priceRange.min || hotel.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || hotel.price <= parseInt(priceRange.max));
    
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h3>Loading hotels...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Available Hotels</h1>
      
      {error && <div className="error">{error}</div>}

      {/* Search and Filter Section */}
      <div className="card mb-4">
        <h3 style={{ marginBottom: '20px' }}>Search & Filter</h3>
        <div className="grid grid-3">
          <div className="form-group">
            <label>Search Hotels</label>
            <input
              type="text"
              placeholder="Search by hotel name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Min Price ($)</label>
            <input
              type="number"
              placeholder="Min price"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Max Price ($)</label>
            <input
              type="number"
              placeholder="Max price"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Recommended Hotels Section */}
      {isAuthenticated && recommendedHotels.length > 0 && (
        <div className="mb-5">
          <h2 style={{ marginBottom: '20px' }}>🌟 Recommended for You</h2>
          <div className="grid grid-3">
            {recommendedHotels.map(hotel => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {/* All Hotels Section */}
      <div>
        <h2 style={{ marginBottom: '20px' }}>
          All Hotels ({filteredHotels.length})
        </h2>
        
        {filteredHotels.length === 0 ? (
          <div className="text-center" style={{ padding: '40px' }}>
            <h3>No hotels found matching your criteria</h3>
            <p>Try adjusting your search or filter options</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
