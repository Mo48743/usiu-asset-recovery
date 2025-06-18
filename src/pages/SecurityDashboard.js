import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SecurityDashboard = () => {
  const [items, setItems] = useState([]);
  const [securityEmail, setSecurityEmail] = useState('');
  const navigate = useNavigate();

  // 🔐 Restrict access to security role only
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/');
      } else {
        const userDoc = await getDocs(collection(db, 'users'));
        const userData = userDoc.docs.find(doc => doc.id === user.uid)?.data();
        if (userData?.role !== 'security') {
          alert('Access denied. Security personnel only.');
          navigate('/');
        } else {
          setSecurityEmail(user.email);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📦 Fetch lost items
  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, 'lostItems'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Security Dashboard</h2>
      <p>Logged in as: <strong>{securityEmail}</strong></p>

      {items.length === 0 ? (
        <p>No lost items reported.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{
              backgroundColor: '#f4f4f4',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px'
            }}>
              <h3>{item.itemName}</h3>
              <p><strong>Status:</strong> {item.itemStatus}</p>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Reported by:</strong> {item.yourName}</p>
              <p><strong>Description:</strong> {item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SecurityDashboard;
