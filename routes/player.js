const express = require('express')
const router = express.Router();
const { login, createAccount } = require('../controllers/player');


router.route('/login').post(login);
router.route('/signup').post(createAccount);

module.exports = router;