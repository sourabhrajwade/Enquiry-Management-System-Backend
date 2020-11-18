const express = require("express");

const enquiryController = require('../controller/enquiry');
const autherization = require('../middleware/auth');

const router = express.Router();

router.post('/add', autherization.protect,enquiryController.addEnquiry);
router.patch('/edit',autherization.protect, enquiryController.editEnquiry);
router.delete('/delete', autherization.protect, enquiryController.deleteEnquiry);
router.get('/search',autherization.protect,  enquiryController.getAllEnquiry);
router.get('/name', autherization.protect, enquiryController.getEnquirybyName);

module.exports = router;