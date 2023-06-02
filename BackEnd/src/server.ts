import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/User.routes';
import { registerRouter } from './routes/Register.routes';
import { loginRouter } from './routes/Login.routes';
import { projectRouter } from './routes/Project.routes';
import { connectToDatabase } from './database';

connectToDatabase()
	.then(() => {
		startServer();
	})
	.catch((err) => console.log(err));

function startServer() {
	const app = express();
	app.use(
		cors({
			origin: '*',
		})
	);
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/users', userRouter);
	app.use('/register', registerRouter);
	app.use('/login', loginRouter);
	app.use('/projects', projectRouter);
	app.listen(8000);
}
