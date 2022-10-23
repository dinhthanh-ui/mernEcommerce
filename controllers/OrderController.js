const Order = require("../Models/OrderModel");
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require('../Models/ProductModel')
const User = require('../Models/UserModel')
// create Order
exports.createOrder = catchAsyncErrors(async (req, res, next) =>
{
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = req.body;

	const order = await Order.create({
		shippingInfo: shippingInfo,
		orderItems: orderItems,
		paymentInfo: paymentInfo,
		itemsPrice: itemsPrice,
		taxPrice: taxPrice,
		shippingPrice: shippingPrice,
		totalPrice: totalPrice,
		paidAt: Date.now(),
		user: req.user._id
	});
	res.status(200).json({
		success: true,
		order: order
	});
});

// get all order of the user
exports.getAllOrder = catchAsyncErrors(async (req, res, next) =>
{
	const order = await Order.find({ user: req.user._id });
	const user = await User.findById(req.user._id);

	res.status(200).json({
		success: true,
		order: order,
		user: user
	});
});
// get all order -- admin
exports.getAllOrderAdmin = catchAsyncErrors(async (req, res, next) =>
{
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) =>
	{
		totalAmount += order.totalPrice
	})
	res.status(200).json({
		success: true,
		totally: orders.length,
		totalAmount: totalAmount,
		orders: orders
	});
});

// get single order by id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) =>
{
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (!order)
	{
		return next(new ErrorHandler("khong ton tai order nao voi id nay", 404));
	};

	res.status(200).json({
		success: true,
		order: order
	})

})

// update Order Status ---Admin
exports.updateAdminOrder = catchAsyncErrors(async (req, res, next) =>
{
	// tim order can chinh sua bang id
	const order = await Order.findById(req.params.id);

	if (!order)
	{
		return next(new ErrorHandler("Order not found with this Id", 404));
	}

	if (order.orderStatus === "Đã giao hàngn")
	{
		return next(new ErrorHandler("Bạn đã giao đơn đặt hàng này", 400));
	}

	if (req.body.status === "Đã vận chuyển")
	{
		order.orderItems.forEach(async (o) =>
		{
			await updateStock(o.productId, o.quantity);
		});
	}
	// chinh sua lai trang thai cua order
	order.orderStatus = req.body.status;

	if (req.body.status === "Đã giao hàng")
	{
		order.deliveredAt = Date.now();
	}

	await order.save({ validateBeforeSave: false });
	res.status(200).json({
		success: true,
	});
});

async function updateStock (id, quantity)
{
	const product = await Product.findById(id);
	// lay so luong san pham trong kho  tru di so luong san pham da order
	if (product.stock !== 0)
	{
		product.stock = product.stock - quantity;
	}
	await product.save({ validateBeforeSave: false });
}

// delete order 

exports.deleteOrder = catchAsyncErrors(async (req, res, next) =>
{
	const order = await Order.findById(req.params.id);

	if (!order)
	{
		return next(new ErrorHandler("Không tìm thấy đơn đặt hàng với Id này", 404));
	};

	await order.remove();

	res.status(200).json({
		success: true,
	})
})