exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash('validationErrors'),
        isAdmin: true,
        isUser: true
    });
};