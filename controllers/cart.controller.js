const validationResult = require('express-validator').validationResult;
const cartModel = require('../models/cart.model');

exports.postCart = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty()) {
        await cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            productId: req.body.productId,
            timestamp: Date.now()
        });
        res.redirect('/cart');
    } else {
        const errorsArray = validationErrors.array().map(err => ({
            param: err.path,
            msg: err.msg
        }));
        req.flash('validationErrors', errorsArray);
        res.redirect(req.body.redirectTo);
    }
}

exports.getCart = async (req, res, next) => {
    const userItems = await cartModel.getItemByUserId(req.session.userId);
    res.render('cart', {items: userItems, isUser: true, validationErrors: req.flash('validationErrors')[0]});
}

exports.updateAmount = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty()) {
        await cartModel.editItem(req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()
        });
        res.redirect('/cart');
    } else {
        const errorsArray = validationErrors.array().map(err => ({
            param: err.path,
            msg: err.msg
        }));
        req.flash('validationErrors', errorsArray);
        res.redirect('/cart');
    }
}

exports.deleteProductFromCart = async (req, res, next) => {
    await cartModel.deleteItem(req.body.cartId);
}