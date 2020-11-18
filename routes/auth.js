const express = require("express");

const authController = require('../controller/auth');
// const autherization = require('../middleware/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;