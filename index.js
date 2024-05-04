const express = require("express");
const app = express();
const cors = require("cors");
const {
	globalErrorHandler,
	signUp,
	addExercise,
	getAllUsers,
	getLogs,
} = require("./src/controller/controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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
app.post("/api/users", bodyParser.urlencoded({ extended: false }), signUp);
app.get("/api/users", getAllUsers);
app.post(
	"/api/users/:_id/exercises",
	bodyParser.urlencoded({ extended: false }),
	addExercise
);
app.get("/api/users/:_id/logs", getLogs);

app.use(globalErrorHandler);
const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
