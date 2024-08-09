const router = require("express").Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignup);
router.pst('/signup', bodyParser.urlencoded({extended: true}), authController.postSignup);

module.exports = router;