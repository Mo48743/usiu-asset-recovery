// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      }
    };
    fetchUserRole();
  }, [currentUser]);

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

      {/* ✅ Admin-only button */}
      {role === 'admin' && (
        <button style={sidebarButtonStyle} onClick={() => navigate('/admin-dashboard')}>
          Admin Dashboard
        </button>
      )}

      {/* ✅ Security-only button */}
      {role === 'security' && (
        <button style={sidebarButtonStyle} onClick={() => navigate('/security-dashboard')}>
          Security Dashboard
        </button>
      )}

      <button style={sidebarButtonStyle} onClick={() => navigate('/all-lost-items')}>
        Items Collection
      </button>
    </aside>
  );
};

export default Sidebar;
