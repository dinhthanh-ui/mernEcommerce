const app = require('./app');
const connectDatabase = require('./Database/DatabaseMongoose')

/*
	Handling uncaught exceptions: Xử lý các trường hợp ngoại lệ không cần thiết
*/
process.on('uncaughtException', (err) =>
{
	console.error(`Error: ${err.message}`);
	console.log(`Tắt máy chủ để Xử lý các trường hợp ngoại lệ không cần thiết `)
})
/*
	config dot env
*/
require('dotenv').config()
/*
	connect database mongoose
*/
connectDatabase();
/*
	create server
*/
const server = app.listen(process.env.PORT, () =>
{
	console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled promise rejection

// process.on('unhandledRejection', (err) =>
// {
// 	console.log(`Shutting down server for ${err.message}`);

// 	console.log(`Tắt máy chủ do từ chối lời hứa chưa được xử lý `)

// 	server.close(() =>
// 	{
// 		process.exit(1);
// 	});
// })