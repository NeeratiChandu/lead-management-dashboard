const mongoose = require('mongoose');
const Lead = require('./models/Lead');
require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const seedLeads = async () => {
  await connectDB();
  const leads = [];
  const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Wilson'];
  const stages = ['new', 'contacted', 'qualified', 'converted'];
  const sources = ['website', 'referral', 'social', 'cold-call'];

  for (let i = 0; i < 500; i++) {
    leads.push({
      name: `${names[i % names.length]} ${i}`,
      email: `lead${i}@example.com`,
      phone: `123-456-${String(i).padStart(4, '0')}`,
      company: `Company ${i % 10}`,
      stage: stages[i % stages.length],
      source: sources[i % sources.length],
    });
  }

  await Lead.insertMany(leads);
  console.log('500 leads seeded');
  process.exit();
};

seedLeads();