const User = require("./model/model");
const Exercise = require("./model/model");
const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
	next();
};

const signUp = async (req, res, next) => {
	try {
		const user = new User({
			username: req.body.username,
		});
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		return next(err);
	}
};
const addExercise = async (req, res) => {
	try {
		const exercise = new Exercise({
			username: req.body.username,
			description: req.body.description,
			duration: req.body.duration,
			date: req.body.date,
		});
		const newExercise = await exercise.save();
		res.status(201).json(newExercise);
	} catch (err) {
		return next(err);
	}
};

module.exports = { globalErrorHandler, signUp, addExercise };
