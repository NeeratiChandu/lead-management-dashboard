const express = require('express');
const Lead = require('../models/Lead');
const router = express.Router();

// Middleware for basic auth (simple JWT check)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET /api/leads (with search, filter, sort, pagination)
router.get('/', authenticate, async (req, res) => {
  const { search, stage, source, sort = 'createdAt:desc', page = 1, limit = 10 } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (stage) query.stage = stage;
  if (source) query.source = source;

  const sortObj = {};
  const [field, order] = sort.split(':');
  sortObj[field] = order === 'desc' ? -1 : 1;

  try {
    const leads = await Lead.find(query)
      .sort(sortObj)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Lead.countDocuments(query);
    res.json({ leads, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/leads/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;