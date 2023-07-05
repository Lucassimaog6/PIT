import {Schema, model} from 'mongoose';

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
    },
    degree: {
        type: String,
    },
    genre: {
        type: String
    },
    points: {
        type: Number,
        default: 10,
        min: [0, 'Points must be at least 0'],
    },
});

export const User = model('User', UserSchema);
