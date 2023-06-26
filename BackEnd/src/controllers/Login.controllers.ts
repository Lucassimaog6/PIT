import { Request, Response } from 'express';
import { User } from '../models/User.models';
import axios from 'axios';

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

async function GithubLogin(req: Request, res: Response) {
	const response = await axios.post(
		`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`,
		null,
		{
			headers: {
				Accept: 'application/json',
			},
		}
	);
	const data = response.data;
	console.log(data);
	res.json(data);
}

async function GithubUser(req: Request, res: Response) {
	req.get('Authorization');
	const response = await fetch('https://api.github.com/user', {
		method: 'GET',
		headers: {
			Authorization: req.get('Authorization')!,
		},
	});
	const data = await response.json();
	console.log(data);
	res.json(data);
}

export { Login, GithubLogin, GithubUser };
