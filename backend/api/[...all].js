const dotenv = require('dotenv');
const path = require('path');
const app = require('../app');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = app;
