import { Router } from 'express';
import { Register } from '../controllers/Register.controllers';

export const registerRouter = Router();
registerRouter.post('/', Register);
