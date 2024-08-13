const productModel = require('../models/products.model');

exports.getProduct = async (req, res, next) => {
    try { 
        let id = req.params.id;
        let product = await productModel.getProductById(id);
        res.render('product', {product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationErrors: req.flash('validationErrors')[0]
        });
    } catch (err) {
        res.redirect('/error');
    }
}

exports.getFirstproduct = async (req, res, next) => {
    try {
        let product = await productModel.getFirstProduct();
        res.render('product', {product : product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin
        });
    } catch (err) {
        res.redirect('/error');
    }
}