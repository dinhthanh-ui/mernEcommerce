const express = require('express');

const router = express.Router();
const {
	createUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	userDetails,
	updatePassword,
	updateProfile,
	getAllUsers,
	getSingleUser,
	updateUserRole,
	deleteUser }
	= require('../controllers/UserController');
const { isAuthUser, authorizeRoles } = require("../middleware/auth")

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthUser, userDetails);
router.route("/me/update").put(isAuthUser, updatePassword);
router.route("/me/update/info").put(isAuthUser, updateProfile);

router.route("/admin/users").get(isAuthUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/users/:id").
	get(isAuthUser, authorizeRoles("admin"), getSingleUser)
	.put(isAuthUser, authorizeRoles("admin"), updateUserRole)
	.delete(isAuthUser, authorizeRoles("admin"), deleteUser);



module.exports = router;