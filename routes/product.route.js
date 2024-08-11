const router = require('express').Router();

const prouctController = require('../controllers/product.controller');
const authGuards = require('../guards/auth.guard');

router.get("/", authGuards.isAuth, prouctController.getFirstproduct);

router.get("/:id", authGuards.isAuth, prouctController.getProduct);

module.exports = router;