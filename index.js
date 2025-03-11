const express = require('express'); //importing express
const app = express();  //creating an instance of express
const urlRoute = require('./routes/url');   //importing the router from url.js
const URL = require('./models/url');    //importing the URL model
const { connectToMongoDB } = require('./connect');  //importing the connect function from connect.js
const ejs = require('ejs'); //importing ejs
const path = require('path');   //importing path
const staticRoute = require('./routes/staticRouter');  //importing the staticRouter

app.set('view engine', 'ejs');  //setting the view engine to ejs
app.set('views', path.resolve('./views'));  //setting the views directory to views

const port = 3000;  //setting the port to 3000

//connecting to the database
connectToMongoDB('mongodb://localhost:27017/short-url') 
.then(() => {
    console.log('Connected to MongoDB');
});

// allowing the json data to be parsed
app.use(express.json());
// allowing the urlencoded data to be parsed that is form data
app.use(express.urlencoded({ extended: false }));

//rendering the home page
app.get('/test', async(req, res) =>{
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });

});


app.use('/url', urlRoute);  //using the url router
app.use('/', staticRoute);   //using the staticRouter

// adding entry history to the URL and redirecting the user to original url
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
    // if (!entry) {
    //     return res.status(404).send('Short URL not found');
    // }
    res.redirect(entry.redirectURL);
});


//conforming that port is working fine
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});