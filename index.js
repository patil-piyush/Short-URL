//importing basic packages
const express = require('express'); //importing express
const app = express();  //creating an instance of express
const cookieParser = require('cookie-parser');
const ejs = require('ejs'); //importing ejs
const path = require('path');   //importing path

//importing database models
const URL = require('./models/url');    //importing the URL model
const { connectToMongoDB } = require('./connect');  //importing the connect function from connect.js



// importing routers
const urlRoute = require('./routes/url');   //importing the router from url.js
const staticRoute = require('./routes/staticRouter');  //importing the staticRouter
const userRoute = require('./routes/user')
const {
    checkForAuthentication,
    restrictTo,
} = require('./middlewares/auth');


app.set('view engine', 'ejs');  //setting the view engine to ejs
app.set('views', path.resolve('./views'));  //setting the views directory to views



const port = 3000;  //setting the port to 3000

//connecting to the database
connectToMongoDB('mongodb://localhost:27017/short-url') 
.then(() => {
    console.log('Connected to MongoDB');
});


//middlewares
app.use(express.json());    // allowing the json data to be parsed
app.use(express.urlencoded({ extended: false }));   // allowing the urlencoded data to be parsed that is form data
app.use(cookieParser());
app.use(checkForAuthentication);


//rendering the home page
app.get('/test', async(req, res) =>{
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });

});


//using all the routes
app.use('/url',restrictTo(["NORMAL", "ADMIN"]), urlRoute);  //using the url router
app.use('/', staticRoute);   //using the staticRouter
app.use('/user', userRoute);  //using the userRoute


//conforming that port is working fine
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});