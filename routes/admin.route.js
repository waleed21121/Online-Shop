const router = require("express").Router();
const adminController = require('../controllers/admin.controller');
const bodyParser = require('body-parser');
const adminGuard = require('../guards/admin.guard');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/add', adminGuard.isUserAdmin, adminController.getAdd);

module.exports = router