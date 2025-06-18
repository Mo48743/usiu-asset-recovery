// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Make sure this path is correct

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // ✅ This gives us the logged-in user

  const sidebarButtonStyle = {
    backgroundColor: 'white',
    color: '#1C2535',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <aside
      style={{
        width: '250px',
        backgroundColor: '#1C2535',
        padding: '2rem 1rem',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <button style={sidebarButtonStyle} onClick={() => navigate('/report-lost')}>
        Report Item
      </button>
      <button style={sidebarButtonStyle} onClick={() => navigate('/view-recovered')}>
        View Recovered Items
      </button>
      <button style={sidebarButtonStyle} onClick={() => navigate('/track-claim')}>
        Track My Claim
      </button>

      {/* ✅ Only show admin dashboard if user is logged in */}
      {currentUser && (
        <button style={sidebarButtonStyle} onClick={() => navigate('/admin-dashboard')}>
          Admin Dashboard
        </button>
      )}

      {/* ✅ Anyone can see Items Collection */}
      <button style={sidebarButtonStyle} onClick={() => navigate('/all-lost-items')}>
        Items Collection
      </button>
    </aside>
  );
};

export default Sidebar;
