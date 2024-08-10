const router = require("express").Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

let createAccountValidator = [
    check('username').notEmpty().withMessage('Name is required')
        .isAlpha('en-US', {ignore: ' '}).withMessage('Name must contain only alphabetic characters'),
    check('email').isEmail().withMessage('Invalid Email format')
        .isEmail({host_whitelist : ['gmail.com']}).withMessage('Email must end with @gmail.com'),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must contain at least 8 characters'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
        return false;
        }
        return true;
    }).withMessage('Password confirmation does not match password')
];

router.use(bodyParser.urlencoded({extended: true}));
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignup);
router.post('/signup', createAccountValidator, authController.postSignup);
router.get('/login', authController.getlLogin);
router.post('/login', authController.postLogin);
router.all('/logout', authController.logout);
module.exports = router;