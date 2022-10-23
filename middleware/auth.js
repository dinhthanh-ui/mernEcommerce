const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");


exports.isAuthUser = catchAsyncErrors(async (req, res, next) =>
{
	const { token } = req.cookies;

	if (!token)
	{
		return next(new ErrorHandler("Vui lòng đăng nhập để truy cập tài nguyên này", 401));
	}
	const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

	req.user = await User.findById(decodedData.id);

	next();
})

exports.authorizeRoles = (...roles) =>
{
	return (req, res, next) =>
	{
		if (!roles.includes(req.user.role))
		{
			return next(new ErrorHandler(`${req.user.role} không thể truy cập tài nguyên này`))
		};
		next();
	}
}