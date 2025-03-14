const express = require('express');

//importing controller functions from path - ../controllers/user 
const {
    handleUserSighup,
    handleUserLogin,
} = require("../controllers/user");

//creating a router 
const router = express.Router();

//assigning the functions to corresponding paths
router.post('/', handleUserSighup);
router.post('/login', handleUserLogin);

//exporting the router
module.exports = router;