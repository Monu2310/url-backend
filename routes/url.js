const express = require('express')
const{ handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url')
const URL = require('../models/url')
const router = express.Router()

router.post('/', handleGenerateNewShortURL)

router.get('/analytics/:shortId',handleGetAnalytics)

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.redirectUrl);
    } catch (err) {
        console.error("Error fetching short URL:", err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router  