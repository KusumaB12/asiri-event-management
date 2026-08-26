const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  customId: { type: String, unique: true, index: true },
  eventId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: [
      'Mandap & Decor',
      'Royal Catering',
      'Cinematography',
      'DJ & Sound',
      'Artist & Band',
      'Venue Hire',
      'Hospitality & Security',
      'Other'
    ],
    default: 'Mandap & Decor' 
  },
  amount: { type: Number, required: true, default: 0 },
  paymentStatus: { 
    type: String, 
    enum: ['Paid', 'Deposit Paid', 'Pending'],
    default: 'Pending' 
  },
  contact: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', VendorSchema);
