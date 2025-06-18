import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ViewRecovered = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lostItems'));
        const allItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(allItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Filter logic
  const filteredItems = items.filter(item => {
    const matchesSearch = (
      item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.yourName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus =
      statusFilter === 'All' || item.itemStatus?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Items Collection</h2>

      {/* 🔍 Search Bar & 🔽 Status Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name, color, location or reporter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '250px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Found">Found</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* 📝 Results List */}
      {filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredItems.map(item => (
            <li
              key={item.id}
              style={{
                background: '#f0f0f0',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <h3>{item.itemName || 'Unnamed Item'}</h3>
              <p><strong>Status:</strong> {item.itemStatus}</p>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Reported By:</strong> {item.yourName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewRecovered;
