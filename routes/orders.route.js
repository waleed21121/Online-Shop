const router = require("express").Router();
const bodyParser = require("body-parser");
const orderController = require('../controllers/order.controller');
const authGard = require('../guards/auth.guard');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/verify-order', authGard.isAuth, orderController.getOrderVerify);

router.post('/', authGard.isAuth, orderController.postOrder);

module.exports = router;