const orderModel = require('../models/oreder.model');
const cartModel = require('../models/cart.model');
const validationResult = require('express-validator').validationResult;

exports.getOrderVerify = async (req, res, next) => {
    const item = await cartModel.getItemById(req.query.order);
    res.render("verify-order", {
        cart: item,
        isUser: true,
        pageTitle: "Verify Order",
        validationError: req.flash('validationErrors')[0]
    });
};

exports.postOrder = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty()) {
        await orderModel.addNewOrder({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.body.userId,
            productId: req.body.productId,
            timestamp: Date.now(),
            address: req.body.address,
            status: "pending"
        }, req.body.cartId);
        res.redirect("/orders");
    } else {
        const errorsArray = validationErrors.array().map(err => ({
            param: err.path,
            msg: err.msg
        }));
        req.flash('validationErrors', errorsArray);
        res.redirect("/orders/verify-order?order=" + req.body.cartId);
    }
};

exports.getOrder = async (req, res, next) => {
    const orders = await orderModel.getOrdersByUser(req.session.userId)
    res.render("orders", {pageTitle: "Orders", isUser: true, items: orders});
};

exports.postCancel = async (req, res, next) => {
    await orderModel.cancelOrder(req.session.userId)
    res.redirect('/orders');
};