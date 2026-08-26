const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  customId: { type: String, unique: true, index: true },
  eventId: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  tier: { 
    type: String, 
    enum: ['VIP', 'Family', 'Dignitary', 'General', 'Press'],
    default: 'General' 
  },
  seat: { type: String, default: 'General Seating' },
  dietary: { type: String, default: 'Pure Veg' },
  rsvpStatus: { 
    type: String, 
    enum: ['Confirmed', 'Pending', 'Tentative', 'Declined'],
    default: 'Confirmed' 
  },
  checkedIn: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Guest', GuestSchema);
