const router = require('express').Router();

const prouctController = require('../controllers/product.controller');

router.get('/:productId', prouctController.getProduct);

modules.export = router;