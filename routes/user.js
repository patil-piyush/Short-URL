const express = require("express");
const {
    handleUserSighup,
} = require("../controllers/user");

const router = express.Router;

router.post('/', handleUserSighup);

module.exports = router;