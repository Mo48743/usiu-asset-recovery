// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header
    style={{
      backgroundColor: '#1B3B6F',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>USIU Asset Recovery</h1>
    <nav style={{ display: 'flex', gap: '0.5rem' }}>
      <Link
        to="/"
        style={{
          backgroundColor: 'yellow',
          color: 'black',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Home
      </Link>
      <Link
        to="/login"
        style={{
          backgroundColor: 'grey',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Login
      </Link>
      <Link
        to="/signup"
        style={{
          backgroundColor: 'white',
          color: '#1B3B6F',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Sign Up
      </Link>
    </nav>
  </header>
);

export default Header;
