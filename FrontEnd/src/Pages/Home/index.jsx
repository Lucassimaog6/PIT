import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

export default function Home() {
	const navigate = useNavigate()
	const {isAuthenticated, user, logout, isLoading} = useAuth0()
	if (!isAuthenticated && !isLoading) navigate('/')

	const [projects, setProjects] = useState([]);
	const [userName, setUserName] = useState('');

	useEffect(() => {
		if (user) setUserName(user.name);

		(async () => {
			const response = await fetch('https://pit.onrender.com/projects/date');
			const _projects = await response.json();
			setProjects(_projects);
		})();

	}, [user]);

	const handleProfile = () => {
		navigate('/profile');
	};

	const handleNewProject = () => {
		navigate('/project/new');
	};

	const handleFilter = () => {
		navigate('/project/filter');
	};

	return (
		<main className='bg-zinc-900 min-h-screen'>
			<header className='flex justify-between p-4'>
				<p>
					Bem vindo: <span>{userName}</span>
				</p>
				<div className='flex gap-4'>
					<button
						onClick={handleFilter}
						className='bg-black/40 w-fit px-4 py-2 rounded'
					>
						Filtros
					</button>
					<button
						onClick={handleNewProject}
						className='bg-black/40 w-fit px-4 py-2 rounded'
					>
						Novo Projeto
					</button>
					<button
						onClick={() => logout()}
						className='bg-black/40 w-fit px-4 py-2 rounded'
					>
						Logout
					</button>
					<button
						onClick={handleProfile}
						className='bg-black/40 w-fit px-4 py-2 rounded'
					>
						Perfil
					</button>
				</div>
			</header>

			{projects.length > 0 ? (
				<div className='grid grid-cols-3 gap-4 p-4'>
					<h1 className='text-4xl text-center col-span-3'>Adicionados recentemente:</h1>
					{projects.map((p) => (
						<div
							key={p._id}
							className='bg-black/40 rounded p-4'
						>
							<h1 className='text-2xl'>{p.title}</h1>
							<p>{p.description}</p>
							<p>
								Dificuldade: <span>{p.dificulty}</span>
							</p>
						</div>
					))}
				</div>
			) : (
				<div className='flex justify-center items-center h-screen'>
					<p>Nenhum projeto encontrado</p>
				</div>
			)}
		</main>
	);
}