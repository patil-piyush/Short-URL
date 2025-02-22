const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');

const port = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
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
    res.redirect(entry.redirectURL);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});