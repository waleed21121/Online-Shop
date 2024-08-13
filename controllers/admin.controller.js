const productsModel = require('../models/products.model');
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
}