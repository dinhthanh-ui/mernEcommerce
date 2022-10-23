const mongoose = require('mongoose');

const connectDatabase = () =>
{
	mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eeg1z.mongodb.net/?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then((data) =>
	{
		console.log("Ket Noi Data Mongoose Thanh Cong")
	})
}

module.exports = connectDatabase