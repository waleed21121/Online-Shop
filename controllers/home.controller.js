const productsModel = require('../models/products.model');

exports.getHome = async(req, res, next) => {
    // Get products
    // Render index.ejs file
    let products = await productsModel.getAllProducts();
    res.render('index', {products: products});
}