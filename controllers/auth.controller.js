const authModel = require('../models/auth.model');

exports.getSignup = (req, res, next) => {
    res.render('signup');
}

exports.postSignup = async (req, res, next) => {
    await authModel.createNewUser(req.body.username, req.body.email, req.body.password).catch(err => res.redirect('/signup'));
    res.redirect('/login');
}

exports.getlLogin = () => {
    res.render('/login');
}