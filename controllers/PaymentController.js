const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const stripe = require("stripe")("sk_test_51Luv51F0iT2RsIec56TNU28K5k0g6ifx9jeBLAo1t2Tdd9fBkU2uPohEb6lbhtNTk37WFlnyWafc3YY2oeR9hbMq00GWlad1Jx");
exports.Payment = catchAsyncErrors(async (req, res, next) =>
{
	const myPayment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: "usd",
		metadata: {
			company: "MERN",
		},
	});

	res
		.status(200)
		.json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) =>
{
	res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
