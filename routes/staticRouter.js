const express = require('express'); //importing express
const URL = require("../models/url")
const router = express.Router();    //creating an instance of express router

router.get('/', async (req, res) => {  //creating a get request for the home page
    if (!req.user) return res.redirect('/login')

    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allurls,
    });   //rendering the home page
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.get('/login', (req, res) => {
    return res.render("login");
});


module.exports = router;    //exporting the router