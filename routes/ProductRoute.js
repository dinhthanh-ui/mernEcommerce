const express = require('express');
const {
	getAllProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getSingleProduct,
	createProductReview,
	getSingleProductReviews,
	deleteReview,
	getAdminProducts
} = require('../controllers/ProductController');
const { isAuthUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProduct);
router
	.route("/admin/products")
	.get(isAuthUser, authorizeRoles("admin"), getAdminProducts);

router.route("/product/new").post(isAuthUser, authorizeRoles("admin"), createProduct);

router.route("/product/:id")
	.put(isAuthUser, authorizeRoles("admin"), updateProduct)
	.delete(isAuthUser, authorizeRoles("admin"), deleteProduct)
	.get(getSingleProduct)

router.route("/product/review").post(isAuthUser, createProductReview);
router.route("/review").get(getSingleProductReviews).delete(isAuthUser, authorizeRoles("admin"), deleteReview);

module.exports = router;


