const router = require('express').Router();

const prouctController = require('../controllers/product.controller');

router.get("/:id", prouctController.getProduct);

module.exports = router;