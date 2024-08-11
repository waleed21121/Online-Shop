const router = require("express").Router();
const bodyParser = require('body-parser');
const authValidator = require('../validators/auth.validator');
const authGuard = require('../guards/auth.guard');


router.use(bodyParser.urlencoded({extended: true}));
const authController = require('../controllers/auth.controller');

router.get('/signup', authGuard.notAuth, authController.getSignup);
router.post('/signup', authGuard.notAuth, authValidator.createAccountValidator, authController.postSignup);
router.get('/login', authGuard.notAuth, authController.getlLogin);
router.post('/login', authGuard.notAuth, authValidator.loginValidator, authController.postLogin);
router.all('/logout', authGuard.isAuth, authController.logout);
module.exports = router;