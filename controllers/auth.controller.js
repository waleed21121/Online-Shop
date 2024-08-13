const authModel = require('../models/auth.model');
const validationResult = require ('express-validator').validationResult;

exports.getSignup = (req, res, next) => {
    res.render('signup', {authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: false
    });
}

exports.postSignup = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty()) {
        try {
            await authModel.createNewUser(req.body.username, req.body.email, req.body.password);
            res.redirect('/login');
        } catch (err) {
            req.flash('authError', err);
            res.redirect('/signup');
        }
    } else {
        const errorsArray = validationErrors.array().map(err => ({
            param: err.path,
            msg: err.msg
        }));

        req.flash('validationErrors', errorsArray);
        res.redirect('/signup');
    }
}

exports.getlLogin = (req, res, next) => {
    res.render('login', {authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false
    });
}

exports.postLogin = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty()) {
        try {
            const user = await authModel.login(req.body.email, req.body.password);
            req.session.userId = user.userId;
            req.session.isAdmin = user.isAdmin;
            res.redirect('/');
        } catch (err) {
            req.flash('authError', err); // flash('key', val) => array
            res.redirect('/login');
        }
    } else {
        const errorsArray = validationErrors.array().map(err => ({
            param: err.path,
            msg: err.msg
        }));
        req.flash('validationErrors', errorsArray);
        res.redirect('/login');
    }
}

exports.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}