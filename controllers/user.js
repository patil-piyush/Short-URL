//importing packages
const {v4: uuidv4} = require('uuid')

const User = require("../models/user")  //importing user model 
const {setUser} = require('../service/auth')    //importing the setuser function from authentication service

async function handleUserSighup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const {email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });
    if(!user) 
        return res.render('login',{
            error: "Invalid Username or Password",
        });
    
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect("/");
}

//exporting the functions
module.exports = {
    handleUserSighup,
    handleUserLogin,
}