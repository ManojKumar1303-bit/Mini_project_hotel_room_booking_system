import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to HotelBooking</h1>
          <p>Find and book the perfect hotel for your next trip</p>
          <div className="hero-buttons">
            <Link to="/hotels" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
              Browse Hotels
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose HotelBooking?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <h3>🏨 Best Hotels</h3>
              <p>Choose from a wide selection of premium hotels with excellent amenities and great locations.</p>
            </div>
            <div className="feature-card">
              <h3>💰 Best Prices</h3>
              <p>Get the best deals and competitive prices for your hotel bookings with our price comparison.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Secure Booking</h3>
              <p>Your bookings are secure with our advanced encryption and reliable payment processing.</p>
            </div>
            <div className="feature-card">
              <h3>📱 Easy Management</h3>
              <p>Manage your bookings easily through our user-friendly dashboard and mobile app.</p>
            </div>
            <div className="feature-card">
              <h3>🤖 AI Assistant</h3>
              <p>Get personalized recommendations and instant help with our AI-powered chatbot.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Analytics</h3>
              <p>Track your booking history and get insights into your travel patterns.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: '30px' }}>Ready to Book Your Stay?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#666' }}>
            Join thousands of satisfied customers who have booked their perfect stays with us.
          </p>
          <Link to="/hotels" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
            Start Booking Now
          </Link>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Home;
