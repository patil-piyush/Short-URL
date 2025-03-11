const express = require('express'); //importing express
const URL = require("../models/url")
const router = express.Router();    //creating an instance of express router

router.get('/', async(req, res) => {  //creating a get request for the home page
    const allurls = await URL.find({});
    return res.render('home',{
        urls: allurls,
    });   //rendering the home page
});


module.exports = router;    //exporting the router