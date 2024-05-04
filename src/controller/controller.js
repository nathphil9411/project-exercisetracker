const { User, Exercise } = require("./model/model");
const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	console.log(err);
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
//format new date

const addExercise = async (req, res, next) => {
	try {
		let date = req.body.date ? new Date(req.body.date) : new Date();

		const formattedDate = date.toDateString();
		console.log(formattedDate);
		const id = req.params._id;
		const user = await User.findById(id);
		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			return next(error);
		}
		const username = user.username;
		const newExercise = await Exercise.create({
			description: req.body.description,
			duration: req.body.duration,
			date: formattedDate,
		});
		user.exercise.push(newExercise);
		await user.save();

		const exercise = {
			username: username,
			description: newExercise.description,
			duration: newExercise.duration,
			date: newExercise.date,
			_id: id,
		};

		res.status(201).json(exercise);
	} catch (err) {
		return next(err);
	}
};
const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		return next(err);
	}
};

//get exercise log
const getLogs = async (req, res, next) => {
	try {
		const id = req.params._id;
		const { from, to, limit } = req.query;
		const user = await User.findById(id);
		if (!user) throw Error("user not found");
		const exercises = user.exercise;
		let filteredLogs = user.exercise;
		if (from) {
			filteredLogs = filteredLogs.filter(
				(log) => new Date(log.date) >= new Date(from)
			);
		}
		if (to) {
			filteredLogs = filteredLogs.filter(
				(log) => new Date(log.date) <= new Date(to)
			);
		}
		// Limit number of logs
		if (limit) {
			filteredLogs = filteredLogs.slice(0, parseInt(limit));
		}

		const log = {
			_id: id,
			username: user.username,
			count: exercises.length,
			log: filteredLogs,
		};

		res.status(200).json(log);
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	globalErrorHandler,
	signUp,
	addExercise,
	getAllUsers,
	getLogs,
};
