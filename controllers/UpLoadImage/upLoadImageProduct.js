var multer = require('multer');
const fs = require('fs');
const ErrorHandler = require('../../utils/ErrorHandler');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

const storage = multer.diskStorage({
	destination: function (req, file, cb)
	{
		cb(null, 'public/product')
	},
	filename: function (req, file, cb)
	{
		// 1. kiểm tra file có tồn tại
		const path = 'public/product/' + file.originalname;
		// 2. kiểm tra định dạng file
		var pattern = /(image\/jpeg|image\/jpg|image\/png|image\/webp)/;
		if (fs.existsSync(path))
		{
			//file exists
			cb('File đã tồn tại')
		}
		else if (!file.mimetype.match(pattern))
		{
			//file exists
			cb('Định dạng file không hợp lệ')
		}
		const uniqueSuffix = Date.now()
		cb(null, uniqueSuffix + '-' + file.originalname)
	}
})
const limits = { fileSize: 50000000 };
const uploads = multer({
	storage, limits
}).single('avatar');
exports.uploadsImageProduct = catchAsyncErrors(async (req, res, next) =>
{
	uploads(req, res, function (err)
	{
		if (err instanceof multer.MulterError || err || req.file.size > 50000000)
		{
			return next(new ErrorHandler(" Dung lượng ảnh quá lớn vượt quá 500kb, Vui lòng chọn bức ảnh khác  !!! ", 404))
		}
		else
		{
			res.status(200).json({
				success: true,
				message: 'Tải Ảnh thành công',
				url: `http://localhost:5050/product/${req.file.filename}`,
			})
		}
	})
})