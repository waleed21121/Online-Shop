const productsModel = require('../models/products.model');

exports.getHome = (req, res, next) => {
    // Get products
    // Render index.ejs file
    productsModel.getAllProducts().then(products => {
        res.render('index', {products: products});
    })
}