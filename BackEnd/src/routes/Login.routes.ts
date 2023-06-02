import { Router } from 'express';
import { Login } from '../controllers/Login.controllers';

export const loginRouter = Router();
loginRouter.post('/', Login);
