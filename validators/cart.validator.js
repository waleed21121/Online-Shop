const check = require('express-validator').check;


exports.checkAmount = [check('amount').notEmpty().withMessage("Amount required").isInt({min: 1}).withMessage("Amount must be number and greater than 0")];

