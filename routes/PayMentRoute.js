const express = require("express");
const { Payment, sendStripeApiKey } = require("../controllers/PaymentController");
const router = express.Router();
const { isAuthUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthUser, Payment);

router.route("/key").get(isAuthUser, sendStripeApiKey);


module.exports = router;