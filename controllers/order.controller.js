const orderModel = require('../models/oreder.model');
const cartModel = require('../models/cart.model');

exports.getOrderVerify = async (req, res, next) => {
    const item = await cartModel.getItemById(req.query.order);
    res.render("verify-order", {
        cart: item,
        isUser: true,
        pageTitle: "Verify Order",
    });
};

exports.postOrder = async (req, res, next) => {
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
};