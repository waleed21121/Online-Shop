const productsModel = require('../models/products.model');

exports.getHome = async(req, res, next) => {
    // Get products
    // Render index.ejs file

    //filter by category
    let category = req.query.category;
    if(category && category !== 'all') {
        let products = await productsModel.getProductsByCategories(category);
        res.render('index', {products: products});
    }
    else {
        let products = await productsModel.getAllProducts();
        res.render('index', {products: products});
    }
}