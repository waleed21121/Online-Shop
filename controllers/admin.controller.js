const productsModel = require('../models/products.model');
const ordersModel = require('../models/oreder.model');
const authModel = require('../models/auth.model');
const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash('validationErrors'),
        isAdmin: true,
        isUser: true
    });
};

exports.postAdd = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty()) {
        req.body.image = req.file.filename;
        await productsModel.addNewProduct(req.body)
        res.redirect("/admin/add");
    } else {
        const errorsArray = validationErrors.array().map(err => ({
            param: err.path,
            msg: err.msg
        }));
        req.flash("validationErrors", errorsArray);
        res.redirect("/admin/add");
    }
};

exports.getOrders = async (req, res, next) => {
    const orders = await ordersModel.getAllOrders();
    for(let i = 0; i < orders.length; i++) {
        const userEmail = await authModel.findUserById(orders[i].userId);
        orders[i].email = userEmail;
    }
    res.render("manage-orders", {
        pageTitle: "Manage Orders",
        isUser: true,
        isAdmin: true,
        items: orders
    });
};

exports.postOrders = async (req, res, next) => {
    await ordersModel.editOrder(req.body.orderId, req.body.status)
    res.redirect("/admin/orders");
};