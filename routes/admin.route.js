const router = require("express").Router();
const adminController = require('../controllers/admin.controller');
const adminGuard = require('../guards/admin.guard');
const addProductValidation = require('../validators/add-product.validator');
const bodyParser = require('body-parser');
const multer = require('multer');

router.use(bodyParser.urlencoded({extended: true}));

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


router.get('/orders', adminGuard.isUserAdmin, adminController.getOrders);

module.exports = router