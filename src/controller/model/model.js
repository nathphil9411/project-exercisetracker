const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "username is required"],
		unique: true,
	},
});
const User = mongoose.model("User", userSchema);

const exerciseSchema = {
	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	description: { type: String, required: [true, "description is required"] },
	duration: { type: Number, required: [true, "duration is required"] },
	date: { type: Date, default: Date.now },
};
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = {
	User,
	Exercise,
};
