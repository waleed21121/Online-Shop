const router = require("express").Router();
const adminController = require('../controllers/admin.controller');
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
}).single('image'), adminController.postAdd);

module.exports = router