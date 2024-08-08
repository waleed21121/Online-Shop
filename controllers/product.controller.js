const productModel = require('../models/products.model');

exports.getProduct = async (req, res, next) => {
    let id = req.params.productId;
    let product = await productModel.getProductById(id);
    res.render('product', {product: product});
}