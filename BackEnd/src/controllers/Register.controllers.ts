import { Request, Response } from 'express';
import { User } from '../models/User.models';

async function Register(req: Request, res: Response) {
	const { name, email, password, born, degree, genre } = req.body;
	try {
		const user = await User.create({
			name,
			email,
			password,
			born,
			degree,
			genre,
		});
		res.status(201).json({ message: 'User created', user });
	} catch (error) {
		res.status(500).json({ message: 'Error creating user', error });
	}
}

export { Register };
