import { Request, Response } from 'express';
import { User } from '../models/User.models';

async function Register(req: Request, res: Response) {
	// Método 1
	try {
		const user = new User(req.body);
		await user.save();
	} catch (err: any) {
		if (err.code === 11000) {
			return res.status(400).json({ err: 'Email already exists' });
		}
		res.status(400).json({ err });
	}

	// // Método 2
	// User.create(...req.body)
	// 	.then((user) => {
	// 		res.status(201).json(user);
	// 	})
	// 	.catch((err) => {
	// 		res.status(400).json({ err });
	// 	});
}

export { Register };
