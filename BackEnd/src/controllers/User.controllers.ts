import { Request, Response } from 'express';
import { User } from '../models/User.models';

// Lista todos os usuários
function getAllUsers(req: Request, res: Response) {
	User.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Lista um usuário específico
function getUser(req: Request, res: Response) {
	User.findById(req.params.id)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Cria um usuário
function createUser(req: Request, res: Response) {
	User.create(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Atualiza um usuário
function updateUser(req: Request, res: Response) {
	User.updateOne({ id: req.params.id }, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Deleta um usuário
function deleteUser(req: Request, res: Response) {
	User.findByIdAndDelete(req.params.id).then((user) => {
		if (user) {
			res.status(200).json({ user: user });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	});
}

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
