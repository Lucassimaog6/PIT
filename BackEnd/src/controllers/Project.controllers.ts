import { Request, Response } from 'express';
import { Project } from '../models/Projects.models';
import { User } from '../models/User.models';

// Cria um projeto
async function createProject(req: Request, res: Response) {
	try {
		const project = await Project.create({
			createdAt: new Date(),
			updatedAt: new Date(),
			upvotes: 0,
			downvotes: 0,
			completed: 0,
			...req.body,
		});
		res.status(201).json(project);
	} catch (err) {
		res.status(400).json(err);
	}
}

// Busca um projeto pelo id
function getProject(req: Request, res: Response) {
	Project.findById(req.params.id)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Busca todos os projetos e ordena por data de atualização
async function getProjectsByDate(req: Request, res: Response) {
	try {
		const project = await Project.find({}).sort({ updatedAt: 'desc' });
		res.status(200).json(project);
	} catch (err) {
		res.status(400).json(err);
	}
}

// Busca todos os projetos e ordena por upvotes
function getProjectsByUpvotes(req: Request, res: Response) {
	Project.find({})
		.sort({
			upvotes: 'desc',
		})
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Adiciona um upvote ao projeto
function upvoteProject(req: Request, res: Response) {
	Project.findById({ id: req.params.id })
		.then((project) => {
			if (project) {
				project.upvotes += 1;
				project.save();
				User.findByIdAndUpdate(
					{ id: project.owner },
					{
						$inc: { points: 1 },
					}
				);
				res.status(200).json(project);
			} else {
				res.status(400).json({ message: 'Projeto não encontrado' });
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Adiciona um downvote ao projeto
function downvoteProject(req: Request, res: Response) {
	Project.findById({ id: req.params.id })
		.then((project) => {
			if (project) {
				project.upvotes -= 1;
				project.save();
				User.findByIdAndUpdate(
					{ id: project.owner },
					{
						$inc: { points: -1 },
					}
				);
				res.status(200).json(project);
			} else {
				res.status(400).json({ message: 'Projeto não encontrado' });
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Busca todos os projetos e filtra por dificuldade
function getProjectsByDificulty(req: Request, res: Response) {
	Project.find({
		dificulty: req.body.dificulty,
	})
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
}

// Adiciona um comentário ao projeto
async function addComment(req: Request, res: Response) {
	const id = req.params.id;
	const { comment } = req.body;
	try {
		const project = await Project.findById(id);
		if (project) {
			project.comments.push(comment);
			project.save();
			res.status(200).json(comment);
		} else {
			res.status(400).json({ message: 'Projeto não encontrado' });
		}
	} catch (err) {
		res.status(400).json(err);
	}
}

async function newWorkingUser(req: Request, res: Response) {
	const id = req.params.id;
	const { userEmail } = req.body;
	const user = await User.findOne({ email: userEmail });
	if (!user) {
		res.status(400).json({ message: 'Usuário não encontrado' });
	}

	const userId = user?._id.toString();

	try {
		const project = await Project.findById(id);
		if (project) {
			project.workingUsers.push(userId!);
			project.save();
			res.status(200).json(user);
		} else {
			res.status(400).json({ message: 'Projeto não encontrado' });
		}
	} catch (err) {
		res.status(400).json(err);
	}
}

async function verifyWorkingUser(req: Request, res: Response) {
	const id = req.params.id;
	const { userEmail } = req.body;
	const user = await User.findOne({ email: userEmail });
	if (!user) {
		res.status(400).json({ message: 'Usuário não encontrado' });
	}

	const userId = user?._id.toString();

	try {
		const project = await Project.findById(id);
		if (project) {
			const isWorking = project.workingUsers.includes(userId!);
			res.status(200).json(isWorking);
		} else {
			res.status(400).json({ message: 'Projeto não encontrado' });
		}
	} catch (err) {
		res.status(400).json(err);
	}
}

export {
	createProject,
	getProject,
	getProjectsByDate,
	getProjectsByUpvotes,
	upvoteProject,
	downvoteProject,
	getProjectsByDificulty,
	addComment,
	newWorkingUser,
	verifyWorkingUser,
};
