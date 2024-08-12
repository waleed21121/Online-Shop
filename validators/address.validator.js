const check = require('express-validator').check;

exports.addressValidator = [check('address').notEmpty().withMessage('Address is required')];