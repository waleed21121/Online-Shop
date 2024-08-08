const productsModel = require('../models/products.model');

exports.getHome = async(req, res, next) => {
    // Get products
    // Render index.ejs file

    //filter by category
    let category = req.query.category;
    let validCategories = ['clothes', 'phones', 'computers'];
    let products;
    if(category && validCategories.includes(category))
        products = await productsModel.getProductsByCategories(category);
    else
        products = await productsModel.getAllProducts();
    res.render('index', {products: products});
}