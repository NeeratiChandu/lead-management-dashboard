const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  company: String,
  stage: { type: String, enum: ['new', 'contacted', 'qualified', 'converted'], default: 'new' },
  source: { type: String, enum: ['website', 'referral', 'social', 'cold-call'], default: 'website' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);