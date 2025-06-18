// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        width: '80%',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      <h1 style={{ color: '#1B3B6F', fontWeight: 'bold' }}>
        Welcome to USIU Asset Recovery System
      </h1>
      <p style={{ color: '#000', marginTop: '1rem' }}>
        The Asset Recovery System is a web platform that helps users report, track, and recover lost items efficiently.
        It also helps in connecting students, security, and admins in a secure and organized way.
      </p>
    </div>
  );
};

export default Home;
