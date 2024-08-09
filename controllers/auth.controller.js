const authModel = require('../models/auth.model');

exports.getSignup = (req, res, next) => {
    res.render('signup');
}

exports.postSignup = async (req, res, next) => {
    try {
        await authModel.createNewUser(req.body.username, req.body.email, req.body.password);
        res.redirect('/login');
    } catch (err) {
        res.redirect('/signup');
    }
}

exports.getlLogin = (req, res, next) => {
    res.render('login');
}