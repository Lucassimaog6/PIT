import { Request, Response } from 'express';
import { Project } from '../models/Projects.models';
import { User } from '../models/User.models';

// Cria um projeto
function createProject(req: Request, res: Response) {
	Project.create(
		{
			upvotes: 0,
			downvotes: 0,
			completed: 0,
		},
		req.body
	)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
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
function getProjectsByDate(req: Request, res: Response) {
	Project.find({})
		.sort({ updatedAt: 'desc' })
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
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

export {
	createProject,
	getProject,
	getProjectsByDate,
	getProjectsByUpvotes,
	upvoteProject,
	downvoteProject,
	getProjectsByDificulty,
};
