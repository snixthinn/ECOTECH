const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
const MOCK_REWARDS = [
  { id: 0, title: "Eco Tech Sticker", provider: "Eco Tech", description: "Exclusive sticker to support the green movement.", cost: 50, validUntil: "Dec 31, 2027" },
  { id: 1, title: "Green Shopping Voucher $25", provider: "Eco Mart", description: "Discount on eco-friendly products.", cost: 250, validUntil: "Dec 31, 2026" },
  { id: 2, title: "Mango Tree Sapling", provider: "Green Nursery", description: "Sapling to plant at home or in the community.", cost: 400, validUntil: "Jun 30, 2026" },
  { id: 3, title: "Environmental Education 1-Month Access", provider: "Eco Academy", description: "Access to online classes on low-waste living.", cost: 600, validUntil: "Mar 31, 2027" },
];

// Routes
app.get('/api/rewards', (req, res) => {
  res.json(MOCK_REWARDS);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Basic mock auth
  if (email && password) {
    res.json({ ok: true, user: { email, name: "Eco User", points: 1200 } });
  } else {
    res.status(401).json({ ok: false, message: "Invalid credentials" });
  }
});

app.post('/api/auth/register', (req, res) => {
  res.json({ ok: true, message: "Registration successful" });
});

app.post('/api/disposal', (req, res) => {
  const { categoryKey, count } = req.body;
  res.json({ ok: true, message: `Successfully disposed ${count} items of ${categoryKey}`, pointsEarned: count * 20 });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
