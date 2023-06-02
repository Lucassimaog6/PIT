import { Request, Response } from 'express';
import { User } from '../models/User.models';

function Login(req: Request, res: Response) {
	const email = req.body.email;
	const password = req.body.password;
	User.find({ email: email, password: password })
		.then((user) => {
			if (user.length > 0) {
				res.json(user).status(200);
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

export { Login };
