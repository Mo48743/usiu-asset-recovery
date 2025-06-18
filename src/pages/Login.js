// src/pages/Login.js
import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Login successful!');
      navigate('/report-lost'); // ✅ This line was changed to match your route
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      alert('Please enter your email to receive reset instructions.');
    } else {
      alert(`Password reset link sent to ${formData.email}.`);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>

        <div className="forgot-password">
          <button
            type="button"
            className="forgot-link"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
