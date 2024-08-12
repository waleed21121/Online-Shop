const router = require("express").Router();
const bodyParser = require("body-parser");
const orderController = require('../controllers/order.controller');
const authGard = require('../guards/auth.guard');

router.use(bodyParser.urlencoded({extended: true}));


router.post('/', authGard.isAuth, orderController.postOrder);