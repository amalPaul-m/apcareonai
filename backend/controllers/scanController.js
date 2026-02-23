const aiService = require('../utils/aiService');

exports.scanMedicine = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const imageBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;

        // Process image with AI Service
        const medicineData = await aiService.analyzeImage(imageBuffer, mimeType);

        res.status(200).json(medicineData);
    } catch (error) {
        console.error('Scan error:', error);
        const message = String(error?.message || '');
        if (message.includes('GEMINI_API_KEY')) {
            return res.status(500).json({ error: 'Server configuration error: GEMINI_API_KEY missing' });
        }
        if (message.includes('Gemini request failed')) {
            return res.status(500).json({ error: message });
        }
        res.status(500).json({ error: 'Failed to process image' });
    }
};
