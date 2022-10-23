const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const ErrorHandler = require('./middleware/error');
const cookieParser = require("cookie-parser");
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static("public"));

/*
	route import
*/
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const uploadImage = require("./routes/UploadImage");
const payment = require("./routes/PayMentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", uploadImage);
app.use("/api/v1", payment);


app.use(ErrorHandler);


module.exports = app