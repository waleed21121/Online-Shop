const router = require("express").Router();
const adminController = require('../controllers/admin.controller');
const addProductValidation = require('../validators/add-product.validator');
const multer = require('multer');

router.get('/add', adminGuard.isUserAdmin, adminController.getAdd);

router.post('/add', adminGuard.isUserAdmin, multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
}).single('image'), addProductValidation.addProductValidator, adminController.postAdd);

module.exports = router