const User = require('../Models/UserModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendMail')
const crypto = require('crypto');


// Register user: dang ky nguoi dung
exports.createUser = catchAsyncErrors(async (req, res, nex) =>
{
	const { name, email, password } = req.body;

	const user = await User.create({
		name: name,
		email: email,
		password: password,
		avatar: {
			public_id: req.body.url,
			url: req.body.url
		}
	});
	sendToken(user, 201, res);
})
// Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) =>
{
	const { email, password } = req.body;
	if (!email || !password)
	{
		return next(new ErrorHandler("Vui long nhap email va password", 400))
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user)
	{
		return next(new ErrorHandler(" nguoi dung khong ton ta voi email va password", 401));
	}
	const isPasswordMatched = await user.comparePassword(password)

	if (!isPasswordMatched)
	{
		return next(new ErrorHandler(" nguoi dung khong ton ta voi email va password", 401));
	}
	sendToken(user, 200, res)
})

//  Log Out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) =>
{
	// res.clearCookie("token");
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true
	});
	res.status(200).json({
		success: true,
		message: " log out successfully"
	})
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) =>
{
	const user = await User.findOne({ email: req.body.email });
	if (!user)
	{
		return next(new ErrorHandler("khong ton tai nguoi dung voi email nay", 404));
	}
	// get resetPassword token

	const resetToken = user.getResetToken();

	await user.save({
		validateBeforeSave: false
	});
	// const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
	const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;
	const message = `your password reset token is:- \n\n ${resetPasswordUrl}`;
	try
	{
		await sendMail({
			email: user.email,
			subject: `Khôi phục mật khẩu thương mại điện tử`,
			message: message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`
		});
	} catch (error)
	{
		user.resetPasswordToken = undefined;
		user.resetPasswordTime = undefined;

		await user.save({
			validateBeforeSave: false
		})
		return next(new ErrorHandler(error.message, 500))
	}
})

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) =>
{
	// create token hash
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordTime: { $gt: Date.now() }
	});

	if (!user)
	{
		return next(new ErrorHandler(" reset password url is invalid or has been expired", 404));
	}

	if (req.body.password !== req.body.confirmPassword)
	{
		return next(new ErrorHandler(" Password is not matched with the new password", 404));
	}

	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordTime = undefined;

	await user.save();

	sendToken(user, 200, res)
})

// get user details

exports.userDetails = catchAsyncErrors(async (req, res, next) =>
{
	const userDetail = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user: userDetail
	});
});

// Update user Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) =>
{
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched)
	{
		return next(new ErrorHandler("mật khẩu cũ không đúng", 400));
	};

	if (req.body.newPassword !== req.body.confirmPassword)
	{
		return next(new ErrorHandler("mật khẩu không chung khop", 400));
	};

	user.password = req.body.newPassword;
	await user.save()
	sendToken(user, 200, res)
});

// update user profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) =>
{
	const newUserData = {
		name: req.body.name,
		email: req.body.email
	};

	newUserData.avatar = {
		public_id: req.body.url,
		url: req.body.url,
	};


	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});
	res.status(200).json({
		success: true,
	});
});

// get all users --admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) =>
{
	const users = await User.find();

	res.status(200).json({
		success: true,
		users: users
	});
});

// Get Single User Details -- admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) =>
{
	const user = await User.findById(req.params.id);

	if (!user)
	{
		return next(new ErrorHandler("User is not found with this id", 400));
	}

	res.status(200).json({
		success: true,
		user: user
	});
});

// change user Roles -- admin

exports.updateUserRole = catchAsyncErrors(async (req, res, next) =>
{
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});
	res.status(200).json({
		success: true,
		user: user
	});
});
// delete user -- admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) =>
{
	const user = await User.findById(req.params.id);

	if (!user)
	{
		return next(new ErrorHandler("User is not found with this id", 400))
	};

	await user.remove();

	res.status(200).json({
		success: true,
		message: "User deleted successfully"
	});
});