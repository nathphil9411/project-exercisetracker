const express = require("express");
const app = express();
const cors = require("cors");
const { globalErrorHandler, signUp } = require("./src/controller/controller");
const mongoose = require("mongoose");
require("dotenv").config();

let db = process.env.DATABASE;
mongoose
	.connect(db)
	.then(() => console.log("connected to db"))
	.catch((err) => {
		console.log(err);
	});

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.use(globalErrorHandler);
const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
