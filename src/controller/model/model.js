const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "username is required"],
		unique: true,
	},
	exercise: { type: Array, default: [] },
});
const User = mongoose.model("User", userSchema);

const exerciseSchema = {
	description: { type: String, required: [true, "description is required"] },
	duration: { type: Number, required: [true, "duration is required"] },
	date: { type: String },
};
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = {
	User,
	Exercise,
};
