//importing basic packages
const express = require('express');

//importing the controllers for url handelling from  path - ../controllers/url.js
const { 
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectUser,
} = require('../controllers/url');

//creating a router
const router = express.Router();

//assigning the functions to corresponding paths
router.post('/', handleGenerateNewShortURL);    //home page
router.get('/analytics/:shortId', handleGetAnalytics);  //path for viewing analytics
router.get('/:shortId', handleRedirectUser);    //path for redirecting to original url

//exporting the router
module.exports = router;