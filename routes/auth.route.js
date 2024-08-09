const router = require("express").Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignup);
router.post('/signup', bodyParser.urlencoded({extended: true}), authController.postSignup);
router.get('/login', authController.getlLogin);

module.exports = router;