const router = require("express").Router();
const bodyParser = require("body-parser");
const orderController = require('../controllers/order.controller');
const authGuard = require('../guards/auth.guard');
const addressValidation = require('../validators/address.validator');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/verify-order', authGuard.isAuth, orderController.getOrderVerify);

router.get('/', authGuard.isAuth, orderController.getOrder);

router.post('/', addressValidation.addressValidator, authGuard.isAuth, orderController.postOrder);

router.post('/cancel', authGuard.isAuth, orderController.postCancel);

module.exports = router;