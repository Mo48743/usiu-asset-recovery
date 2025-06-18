import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import './AllLostItems.css'; // optional: if you want to style your items

const AllLostItems = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lostItems'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLostItems(items);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="all-lost-items-container">
      <h2>Items Collections</h2>
      {lostItems.length === 0 ? (
        <p>No items reported yet.</p>
      ) : (
        <ul className="items-list">
          {lostItems.map(item => (
            <li key={item.id} className="item-card">
              <h3>{item.itemName}</h3>
              <p><strong>Status:</strong> <span style={{ color: item.itemStatus === 'Found' ? 'green' : 'red' }}>{item.itemStatus}</span></p>
              <p><strong>Date:</strong> {item.dateLost}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Reported By:</strong> {item.yourName}</p>
              {item.message && <p><strong>Message:</strong> {item.message}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllLostItems;
