const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) =>
{
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Interval serve error"

	// wrong mongodb id errors

	if (err.name === "CastError")
	{
		const message = `Không tìm thấy tài nguyên với id này .. Không hợp lệ ${err.path}`;
		err = new ErrorHandler(message, 404);
	}

	//  duplicate key error
	if (err.code === 11000)
	{
		const message = ` ${Object.keys(err.keyValue)} dang nhap dang bi trung lap, vui long doi ${Object.keys(err.keyValue)} khac `
		err = new ErrorHandler(message, 400)
	}
	//  wrong jwt error
	if (err.code === "jsonWebTokenError")
	{
		const message = `Your url is invalid please try again `
		err = new ErrorHandler(message, 400)
	}
	//  jwt expired error
	if (err.code === "TokenExpiredError")
	{
		const message = `Your url is expired please try again `
		err = new ErrorHandler(message, 400)
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message
	});
}; 