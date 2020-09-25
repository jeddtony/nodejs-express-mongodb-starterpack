const router = require('express').Router();
const AuthController = require('../controllers/authController');

router.post("/login", AuthController.postLogin);


module.exports = router;