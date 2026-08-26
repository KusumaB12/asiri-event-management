const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  customId: { type: String, unique: true, index: true },
  title: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    enum: ['Wedding', 'Pre-Wedding', 'Custom', 'Birthday', 'Corporate', 'Concert', 'Private'],
    default: 'Custom' 
  },
  date: { type: String, required: true },
  time: { type: String, default: '18:30 IST / Shubh Muhurat' },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  capacity: { type: Number, default: 350 },
  budget: { type: Number, default: 1500000 },
  spent: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['Live', 'Production', 'Planning', 'Rehearsal', 'Completed'],
    default: 'Planning' 
  },
  image: { type: String, default: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop' },
  description: { type: String, default: '' },
  rsvps: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
