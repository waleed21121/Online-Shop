const check = require('express-validator').check;

const checkName = () => check('name').notEmpty().withMessage('Name is required')
                            .isAlpha('en-US', {ignore: ' '}).withMessage('Name must contain only alphabetic characters');

const checkPrice = () => check('price').notEmpty().withMessage("Price required")
                            .isInt({min: 1}).withMessage("Price must be number and greater than 0");

const checkDescription = () => check('description').notEmpty().withMessage('Description is required');

const checkImage = () => check('image').custom((value, {req}) => {
    if(!req.file.originalname.toLowerCase().endsWith('.jpg')) {
        return false;
    } else return true;
}).withMessage('Only .jpg files are allowed!');

exports.addProductValidator = [checkName(), checkPrice(), checkDescription(), checkImage()];