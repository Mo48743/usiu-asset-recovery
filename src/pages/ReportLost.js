import React, { useState } from 'react';
import './ReportLost.css';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ReportLost = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    dateLost: '',
    description: '',
    location: '',
    yourName: '',
    message: '',
    itemStatus: '', // Added itemStatus field
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'lostItems'), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      alert('✅ Lost item reported successfully!');
      setFormData({
        itemName: '',
        dateLost: '',
        description: '',
        location: '',
        yourName: '',
        message: '',
        itemStatus: '',
      });
    } catch (error) {
      console.error('❌ Error reporting item:', error);
      alert('❌ Failed to report lost item.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="report-lost-container">
      <h2>Report Item</h2>
      <form className="report-lost-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateLost"
          value={formData.dateLost}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Item Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location Lost"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="yourName"
          placeholder="Your Name"
          value={formData.yourName}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Any message about the lost item (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        {/* ✅ Item Status Field with Bold Label */}
        <label style={{ fontWeight: 'bold' }}>
          Item Status:
          <select
            name="itemStatus"
            value={formData.itemStatus}
            onChange={handleChange}
            required
            style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">-- Select Status --</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ReportLost;
