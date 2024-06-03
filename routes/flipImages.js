const express = require('express');
const router = express.Router();

const { getImages, uploadImage } = require("../controllers/flipImages");

router.route('/').get(getImages);
router.route('/').post(uploadImage);

module.exports = router;