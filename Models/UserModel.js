const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please your Name"],
		minLength: [3, "Please enter a name atleast 3 characters"],
		maxLength: [25, "Name can not big than 15 characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		validate: [validator.isEmail, "Please enter a valid email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter your password!"],
		minLength: [8, "Password should be greater than 8 characters"],
		select: false, //=> neu su dung false thi se an password 
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	resetPasswordToken: String,
	resetPasswordTime: Date,
});

// Hash password

userSchema.pre("save", async function (next)
{
	if (!this.isModified("password"))
	{
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
})
// jwt token

userSchema.methods.getJwtToken = function ()
{
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_KEY
	})
}
// compare password
userSchema.methods.comparePassword = async function (enteredPassword)
{
	return await bcrypt.compare(enteredPassword, this.password)
}

// forgot password
userSchema.methods.getResetToken = function ()
{
	// generating token => tạo mã thông báo
	const resetToken = crypto.randomBytes(20).toString("hex");

	//hashing and adding resetPassword to userSchema => băm và thêm resetPassword vào userSchema
	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.resetPasswordTime = Date.now() + 15 * 60 * 60 * 1000;
	return resetToken;
}


module.exports = mongoose.model("User", userSchema);