const shortid = require("shortid");
const URL = require("../models/url");
const { model } = require("mongoose"); 

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ error: "The 'url' field is required in the request body." });
    }

    try {
        const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
        });

    return res.render('home',{id: shortID });
    } catch (err) {
        console.error("Error creating short URL:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = { handleGenerateNewShortURL,handleGetAnalytics };