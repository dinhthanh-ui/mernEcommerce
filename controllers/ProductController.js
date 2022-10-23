const Product = require('../Models/ProductModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Features = require('../utils/Features');

exports.getAllProduct = catchAsyncErrors(async (req, res) =>
{
	const resultPage = 8;
	const productsCount = await Product.countDocuments();
	const feature = new Features(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPage);

	const products = await feature.query;

	res.status(200).json({
		success: true,
		products: products,
		resultPage,
		productsCount
	})

});
/*
	Create Product
*/
exports.createProduct = catchAsyncErrors(async (req, res, next) =>
{
	const newProductData = {
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		discountPrice: req.body.offerPrice,
		price: req.body.price,
		stock: req.body.stock,
	};

	newProductData.images = {
		public_id: req.body.url,
		url: req.body.url,
	};

	const product = await Product.create(newProductData);

	res.status(200).json({
		success: true,
		product: product
	})
});
/*
	Update Product --> admin
*/
exports.updateProduct = catchAsyncErrors(async (req, res, next) =>
{

	let product = await Product.findById(req.params.id);
	const newProductData = {
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		discountPrice: req.body.offerPrice,
		price: req.body.price,
		stock: req.body.stock,
	};
	if (req.body.dataImageUrl !== null || req.body.dataImageUrl !== undefined)
	{
		newProductData.images = {
			public_id: req.body.dataImageUrl,
			url: req.body.dataImageUrl,
		};
	}
	if (!product)
	{
		return next(new ErrorHandler("Product is not found with id", 404))
	};

	let data = await Product.findByIdAndUpdate(req.params.id, newProductData, {
		new: true,
		runValidators: true,
		useUnified: false
	});

	res.status(200).json({
		success: true,
		products: data
	})
});
/*
	delete product
*/
exports.deleteProduct = catchAsyncErrors(async (req, res, next) =>
{
	const product = await Product.findById(req.params.id);

	if (!product)
	{
		return next(new ErrorHandler("Product is not found with id", 404))
	}

	await product.remove();
	res.status(200).json({
		success: true,
		message: "xoa san pham thanh cong"
	})
});

/*
	single Product detail
*/
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) =>
{
	const product = await Product.findById(req.params.id);

	if (!product)
	{
		return next(new ErrorHandler("Product is not found with id", 404))
	}

	res.status(200).json({
		success: true,
		product: product
	})
});

// create review and update review

exports.createProductReview = catchAsyncErrors(async (req, res, next) =>
{
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);
	// tim ra review cua user voi id cua user do
	const isReviewed = product.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString()
	);

	if (isReviewed)
	{
		// neu ton tai review cua use thi thay the review moi
		product.reviews.forEach((rev) =>
		{
			if (rev.user.toString() === req.user._id.toString())
			{
				(rev.rating = rating), (rev.comment = comment);
			}
		});
	} else
	{
		//neu khong ton tai review cua use thi thay the review da nhap 
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	let avg = 0;

	// loc tat ca cac phan tu trong mang
	// cong ca phan tu trong voi nhau
	product.reviews.forEach((rev) =>
	{
		// avg += rev.rating;
		avg = avg + rev.rating
	});

	// tinh pham tram xep hang cua san pham thong qua review
	// lay tong so danh gia chia so luong review san pham
	product.ratings = avg / product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

// get all reviews of a single product
exports.getSingleProductReviews = catchAsyncErrors(async (req, res, next) =>
{
	const product = await Product.findById(req.query.id);

	if (!product)
	{
		return next(new ErrorHandler("Product is not found with id", 404))
	}

	res.status(200).json({
		success: true,
		reviews: product.reviews
	})
})

// Delete Review --Admin

exports.deleteReview = catchAsyncErrors(async (req, res, next) =>
{
	// tim san pham co review 
	const product = await Product.findById(req.query.productId);

	if (!product)
	{
		return next(new ErrorHandler("Product not found with this id", 404));
	}

	const reviews = product.reviews.filter(
		// tao mot ban sao id de so sanh voi id cua review trong product 	
		// bat dau loc, neu 2 id khach nhau thi cho dieu kien 
		(rev) => rev._id.toString() !== req.query.id.toString()
	);

	let avg = 0;

	reviews.forEach((rev) =>
	{
		avg += rev.rating;
	});

	let ratings = 0;

	if (reviews.length === 0)
	{
		ratings = 0;
	} else
	{
		ratings = avg / reviews.length;
	}

	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) =>
{
	const products = await Product.find();
	const resultPage = 10;

	res.status(200).json({
		success: true,
		products,
		resultPage
	});
});
