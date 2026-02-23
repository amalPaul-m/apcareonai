const express = require('express');
const cors = require('cors');
const scanRoutes = require('./routes/scanRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/scan', scanRoutes);

app.get('/', (req, res) => {
  res.send('AI Medicine Scanner API is running');
});

module.exports = app;
