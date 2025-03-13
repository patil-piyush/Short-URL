const express = require('express');
const {
    handleUserSighup,
    handleUserLogin,
} = require("../controllers/user");

const router = express.Router();

router.post('/', handleUserSighup);
router.post('/login', handleUserLogin);

module.exports = router;