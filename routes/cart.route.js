const router = require('express').Router();
const bodyParser = require('body-parser');
const cartController = require('../controllers/cart.controller');
const authGard = require('../guards/auth.guard');
const cartValidator = require('../validators/cart.validator');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', authGard.isAuth, cartController.getCart);

router.post('/', authGard.isAuth, cartValidator.checkAmount, cartController.postCart);

module.exports = router;
