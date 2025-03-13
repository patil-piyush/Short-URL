const shortid = require('shortid');
const URL = require('../models/url');

// This function will handle the generation of a new short URL
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render('home', {
        id: shortID,
    });
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });
    return res.json({ totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
     });
}

// adding entry history to the URL and redirecting the user to original url
async function handleRedirectUser(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });
    if (!entry) {
        return res.status(404).send('Short URL not found');
    }
    res.redirect(entry.redirectURL);
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectUser,
};