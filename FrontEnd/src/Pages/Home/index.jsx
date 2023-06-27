import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem('user'));

		if (!user) {
			navigate('/');
		}

		(async () => {
			const response = await fetch(`https://pit.onrender.com/users/${user}`);

			if (response.status === 404) return alert('Usuário não encontrado!');

			const _user = await response.json();

			setUserName(_user.name);
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

	return (
		<>
			<header className='flex justify-between p-4'>
				<p>
					Bem vindo: <span>{userName}</span>
				</p>
				<div className='flex gap-4'>
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

			<h1>Home</h1>
		</>
	);
}
