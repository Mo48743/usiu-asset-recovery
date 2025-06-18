import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Welcome to USIU-Africa Asset Recovery System</h2>
      <p>Please login or sign up to continue</p>
      <div style={{ marginTop: '2rem' }}>
        <Link
          to="/login"
          style={{
            marginRight: '1rem',
            backgroundColor: '#1B3B6F',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            backgroundColor: 'yellow',
            color: '#1B3B6F',
            padding: '0.75rem 2rem',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
