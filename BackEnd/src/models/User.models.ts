import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be at least 6 characters'],
	},
	born: {
		type: Date,
		required: [true, 'Age is required'],
	},
	degree: {
		type: String,
		required: [true, 'Degree is required'],
	},
	genre: {
		type: String,
		required: [true, 'Genre is required'],
	},
	points: {
		type: Number,
		default: 10,
		min: [0, 'Points must be at least 0'],
	},
});

export const User = model('User', UserSchema);
