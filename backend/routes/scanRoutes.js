const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { scanMedicine } = require('../controllers/scanController');

// POST /api/scan - Upload image and get medicine info
router.post('/', upload.single('image'), scanMedicine);

module.exports = router;
