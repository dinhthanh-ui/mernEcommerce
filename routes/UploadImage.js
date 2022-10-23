const express = require('express');
const { uploadsImage } = require('../controllers/UpLoadImage/updateImageController');
const { uploadsImageProduct } = require('../controllers/UpLoadImage/upLoadImageProduct');
const router = express.Router();

// upload image
router.route('/uploadFile').post(uploadsImage);
router.route('/uploadFileProduct').post(uploadsImageProduct);

module.exports = router;