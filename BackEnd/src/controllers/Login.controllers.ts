import { Request, Response } from 'express';
import { User } from '../models/User.models';
import axios from 'axios';

async function Login(req: Request, res: Response) {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	const _user = await User.find({ email: email, password: password })
	if (_user.length > 0) {
		res.json(_user).status(200);
	} else {
		try {
			const newUser = await User.create({ name: name, email: email, password: password })
			res.json(newUser).status(201);
		} catch (err) {
			res.status(400).json(err);
		}
	}
}

export { Login };
