const mongoose = require('mongoose');

const TimelineCueSchema = new mongoose.Schema({
  customId: { type: String, unique: true, index: true },
  eventId: { type: String, required: true, index: true },
  time: { type: String, required: true },
  title: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Upcoming', 'In-Progress', 'Completed'],
    default: 'Upcoming' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TimelineCue', TimelineCueSchema);
