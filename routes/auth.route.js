const router = require("express").Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getlLogin);
router.post('/login', authController.postLogin);
router.all('/logout', authController.logout);
module.exports = router;