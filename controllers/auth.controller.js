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
    res.render('login', {authError: req.flash('authError')[0]});
}

exports.postLogin = async (req, res, next) => {
    try {
        let id = await authModel.login(req.body.email, req.body.password);
        req.session.userId = id;
        res.redirect('/');
    } catch (err) {
        req.flash('authError', err); // flash('key', val) => array
        res.redirect('/login');
    }
}

exports.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}