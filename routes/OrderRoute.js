const express = require('express');
const { createOrder, getAllOrder, getSingleOrder, getAllOrderAdmin, updateAdminOrder, deleteOrder } = require('../controllers/OrderController');
const router = express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthUser, createOrder);

router.route("/order/:id").get(isAuthUser, getSingleOrder);

router.route("/orders/me").get(isAuthUser, getAllOrder);

router.route("/admin/orders").get(isAuthUser, authorizeRoles("admin"), getAllOrderAdmin);

router.route("/admin/order/:id").put(isAuthUser, authorizeRoles("admin"), updateAdminOrder).delete(isAuthUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
