import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const TrackMyClaim = () => {
  const [yourName, setYourName] = useState('');
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all claims on load
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'lostItems'));
        const allClaims = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClaims(allClaims);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);

  // Filter claims when user searches
  const handleTrack = () => {
    setLoading(true);
    const filtered = claims.filter(
      item => item.yourName?.toLowerCase() === yourName.toLowerCase()
    );
    setFilteredClaims(filtered);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Track My Claim</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginRight: '1rem',
          }}
        />
        <button onClick={handleTrack} style={{ padding: '0.5rem 1rem' }}>
          Track My Claims
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {filteredClaims.length === 0 && yourName && !loading ? (
        <p>No claims found under "{yourName}".</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredClaims.map(item => (
            <li
              key={item.id}
              style={{
                background: '#f9f9f9',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3>{item.itemName || 'Unnamed Item'}</h3>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
              <p><strong>Status:</strong> {item.itemStatus}</p>
              <p><strong>Response:</strong> {item.message || 'No response yet'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackMyClaim;
