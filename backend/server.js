const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const scanRoutes = require('./routes/scanRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/scan', scanRoutes);

app.get('/', (req, res) => {
  res.send('AI Medicine Scanner API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
