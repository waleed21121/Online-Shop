const productModel = require('../models/products.model');

exports.getProduct = async (req, res, next) => {
    let id = req.params.id;
    let product = await productModel.getProductById(id);
    res.render('product', {product: product, isUser: req.session.userId, validationErrors: req.flash('validationErrors')[0]});
}

exports.getFirstproduct = async (req, res, next) => {
    let product = await productModel.getFirstProduct();
    res.render('product', {product : product, isUser: req.session.userId});
}