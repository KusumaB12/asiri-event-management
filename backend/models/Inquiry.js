const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  city: { type: String, default: '' },
  eventType: { type: String, default: 'Royal Wedding & Sangeet' },
  budgetTier: { type: String, default: '₹50 Lakhs - ₹1 Crore' },
  vision: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Proposal Sent', 'Booked', 'Archived'],
    default: 'New' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inquiry', InquirySchema);
