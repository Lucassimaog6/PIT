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
	age: {
		type: Number,
		required: [true, 'Age is required'],
	},
	avatarLink: String,
	degree: {
		type: String,
		enum: {
			values: ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior'],
			message: 'Degree must be one of the following: Ensino Fundamental, Ensino Médio, Ensino Superior',
		},
	},
	genre: {
		type: String,
		enum: {
			values: ['Feminino', 'Masculino', 'Não-binário'],
			message: 'Genre must be one of the following: Feminino, Masculino, Não-binário',
		},
	},
	points: {
		type: Number,
		default: 10,
		min: [0, 'Points must be at least 0'],
	},
	biography: String,
});

export const User = model('User', UserSchema);
