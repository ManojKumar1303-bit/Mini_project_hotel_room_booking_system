import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
            <h2 style={{ margin: 0, color: '#007bff' }}>🏨 HotelBooking</h2>
          </Link>
          
          <div className="d-flex align-items-center gap-3">
            <Link to="/hotels" className="btn btn-secondary">
              Hotels
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="btn btn-success">
                    Admin
                  </Link>
                )}
                <div className="d-flex align-items-center gap-2">
                  <span>Welcome, {user?.name}</span>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
