import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();

  // 🔐 Check if logged in and is the right admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== 'morinea@usiu.ac.ke') {
        alert("Access denied. Admins only.");
        navigate('/');
      } else {
        setAdminEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 🔄 Load lost items
  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, 'lostItems'));
      const allItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(allItems);
    };

    fetchItems();
  }, []);

  // ✏️ Update status
  const updateStatus = async (itemId, newStatus) => {
    const itemRef = doc(db, 'lostItems', itemId);
    await updateDoc(itemRef, { itemStatus: newStatus });
    setItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, itemStatus: newStatus } : item)
    );
  };

  // 📝 Update response message
  const updateMessage = async (itemId, newMessage) => {
    const itemRef = doc(db, 'lostItems', itemId);
    await updateDoc(itemRef, { message: newMessage });
    setItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, message: newMessage } : item)
    );
  };

  // 🗑 Delete item
  const deleteItem = async (itemId) => {
    const confirm = window.confirm('Are you sure you want to delete this item?');
    if (!confirm) return;
    await deleteDoc(doc(db, 'lostItems', itemId));
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <p>Logged in as: <strong>{adminEmail}</strong></p>

      {items.length === 0 ? (
        <p>No items found in the system.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{
              background: '#f8f8f8',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '10px',
              border: '1px solid #ddd'
            }}>
              <h3>{item.itemName}</h3>
              <p><strong>Status:</strong> {item.itemStatus}</p>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Reported by:</strong> {item.yourName}</p>
              <p><strong>Message:</strong> {item.message || 'None'}</p>

              {/* ✏️ Status Update */}
              <div>
                <label>Change Status: </label>
                <select onChange={(e) => updateStatus(item.id, e.target.value)} value={item.itemStatus}>
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                  <option value="Claimed">Claimed</option>
                </select>
              </div>

              {/* 📝 Add/Edit Message */}
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Type admin message"
                  value={item.message || ''}
                  onChange={(e) => updateMessage(item.id, e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    width: '80%',
                    marginRight: '1rem'
                  }}
                />
              </div>

              {/* 🗑 Delete Button */}
              <button
                onClick={() => deleteItem(item.id)}
                style={{
                  marginTop: '0.5rem',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
