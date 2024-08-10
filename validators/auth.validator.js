const check = require('express-validator').check;

const checkUsername = () => check('username').notEmpty().withMessage('Name is required')
                                .isAlpha('en-US', {ignore: ' '}).withMessage('Name must contain only alphabetic characters');

const checkEmail = () => check('email').isEmail().withMessage('Invalid Email format')
                            .isEmail({host_whitelist : ['gmail.com']}).withMessage('Email must end with @gmail.com');

const checkPassword = () => check('password')
                                .isLength({ min: 8 }).withMessage('Password must contain at least 8 characters');

const checkConfirmPassword = () => check('confirmPassword').custom((value, { req }) => {
                                        if (value !== req.body.password) {
                                            return false;
                                        }
                                        return true;
                                    }).withMessage('Password confirmation does not match password');


exports.createAccountValidator = [checkUsername(), checkEmail(), checkPassword(), checkConfirmPassword()];

exports.loginValidator = [checkEmail(), checkPassword()];