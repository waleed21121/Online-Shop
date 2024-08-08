const router = require('express').Router();

const prouctController = require('../controllers/product.controller');

router.get('/product/:productId', prouctController.getProduct);

modules.export = router;