import { Router } from 'express';
import { Login, GithubLogin, GithubUser } from '../controllers/Login.controllers';

export const loginRouter = Router();
loginRouter.post('/', Login);
loginRouter.get('/github_token', GithubLogin);
loginRouter.get('/github_user', GithubUser);
