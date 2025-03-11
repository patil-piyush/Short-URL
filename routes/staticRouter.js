const express = require('express'); //importing express

const router = express.Router();    //creating an instance of express router

router.get('/', (req, res) => {  //creating a get request for the home page
    return res.render('home');   //rendering the home page
});


module.exports = router;    //exporting the router