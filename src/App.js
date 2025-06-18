// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReportLost from './pages/ReportLost';
import ViewRecovered from './pages/ViewRecovered';
import SubmitClaim from './pages/SubmitClaim';
import TrackClaim from './pages/TrackClaim';
import AdminDashboard from './pages/AdminDashboard';
import SecurityDashboard from './pages/SecurityDashboard';
import AllLostItems from './pages/AllLostItems';
import WelcomePage from './pages/WelcomePage'; // ✅ Include welcome page

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  // ❗Only hide sidebar on welcome, login, and signup pages
  const hideSidebar = ['/welcome', '/login', '/signup', '/'].includes(location.pathname); // ✅ also hide on root

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {!hideSidebar && <Sidebar />}
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#e0e0e0' }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} /> {/* ✅ Make WelcomePage default */}
          <Route path="/home" element={<Home />} />     {/* 🟡 Home now moved to /home */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/view-recovered" element={<ViewRecovered />} />
          <Route path="/submit-claim" element={<SubmitClaim />} />
          <Route path="/track-claim" element={<TrackClaim />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/security-dashboard" element={<SecurityDashboard />} />
          <Route path="/all-lost-items" element={<AllLostItems />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
