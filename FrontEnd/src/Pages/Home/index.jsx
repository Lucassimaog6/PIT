import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const [projects, setProjects] = useState([]);
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem('user'));

		if (!user) {
			navigate('/');
		}

		(async () => {
			const response = await fetch(`https://pit.onrender.com/users/${user}`);
			if (response.status === 404) return navigate('/');
			const _user = await response.json();
			setUserName(_user.name);
		})();

		(async () => {
			const response = await fetch('https://pit.onrender.com/projects/date');
			const _projects = await response.json();
			console.log(_projects);
			setProjects(_projects);
		})();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

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
		<>
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
						onClick={handleLogout}
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
		</>
	);
}