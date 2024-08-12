const orderModel = require('../models/oreder.model');

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