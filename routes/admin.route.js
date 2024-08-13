const router = require("express").Router();
const adminController = require('../controllers/admin.controller');
const bodyParser = require('body-parser');
const adminGuard = require('../guards/admin.guard');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/add', adminGuard.isUserAdmin, adminController.getAdd);

router.post('/add', adminGuard.isUserAdmin, adminController.postAdd);

module.exports = router