import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	dificulty: {
		type: String,
		required: [true, 'Dificulty is required'],
	},
	tags: [String],
	owner: {
		type: String,
		required: [true, 'Owner is required'],
	},
	linkImages: [String],
	createdAt: {
		type: Date,
		required: [true, 'CreatedAt is required'],
	},
	updatedAt: {
		type: Date,
		required: [true, 'UpdatedAt is required'],
	},
	upvotes: {
		type: Number,
		required: true,
		default: 0,
	},
	downvotes: {
		type: Number,
		required: true,
		default: 0,
	},
	completed: {
		type: Number,
		required: true,
		default: 0,
	},
	completedUsers: [String],
	comments: [String],
});

export const Project = model('Project', ProjectSchema);
