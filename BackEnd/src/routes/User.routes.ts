import { Router } from 'express';
import { getAllUsers, getUser, createUser, deleteUser, updateUser } from '../controllers/User.controllers';

export const userRouter = Router();

userRouter.get('/', getAllUsers);       //GET https://monkeycodeapiserver.onrender.com/users -> mostra todos os usuários
userRouter.get('/:id', getUser);        //GET https://monkeycodeapiserver.onrender.com/users/1 -> mostra o usuário com id 1
userRouter.post('/', createUser);       //POST https://monkeycodeapiserver.onrender.com/users -> cria um novo usuário
userRouter.put('/:id', updateUser);     //PUT https://monkeycodeapiserver.onrender.com/users/1 -> atualiza o usuário com id 1
userRouter.delete('/:id', deleteUser);  //DELETE https://monkeycodeapiserver.onrender.com/users/1 -> deleta o usuário com id 1