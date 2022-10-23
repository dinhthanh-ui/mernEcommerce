const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, " Please Enter a Name Of a Product "],
		trim: true,
		maxLength: [100, " Name is can not exceed then 20 characters "]
	},
	description: {
		type: String,
		required: [true, " Description add a description of your product"],
		maxLength: [4000, " Description is can not exceed then 4000 characters "]
	},
	price: {
		type: Number,
		required: [true, " Please Enter a Price Of a Product "],
		maxLength: [8, " Description is can not exceed then 8 characters "]
	},
	discountPrice: {
		type: String,
		maxLength: [4, " Discount Price can not exceed then 4 characters "]
	},
	color: {
		type: String,
	},
	size: {
		type: String,
	},
	ratings: {
		type: Number,
		default: 0
	},
	images: [
		{
			public_id: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}
	],
	category: {
		type: String,
		required: [true, " Please add a category Of your Product "]
	},
	stock: {
		type: Number,
		required: [true, " Please add some stoke for your product "],
		maxLength: [3, " Stock can not exceed then 3 characters "]
	},
	numOfReviews: {
		type: Number,
		default: 0
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true
			},
			name: {
				type: String,
				required: true
			},
			rating: {
				type: Number,
				required: true
			},
			comment: {
				type: String,
			},
			time: {
				type: Date,
				default: Date.now()
			},
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model("Product", productSchema);