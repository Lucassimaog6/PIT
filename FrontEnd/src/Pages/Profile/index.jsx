import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [born, setBorn] = useState('');
	const [degree, setDegree] = useState('');
	const [genre, setGenre] = useState('');

	let user = localStorage.getItem('id');

	useState(() => {
		(async () => {
			const response = await fetch(`http://localhost:8000/users/${user}`);
			const _user = await response.json();

			setName(_user.name);
			setEmail(_user.email);
			setPassword(_user.password);

			const bornDate = new Date(_user.born);
			const formattedBornDate = bornDate.toISOString().substring(0, 10);
			setBorn(formattedBornDate);

			setDegree(_user.degree);
			setGenre(_user.genre);
		})();
	}, []);

	const handleUpdate = async () => {
		const data = {
			name,
			email,
			password,
			born,
			degree,
			genre,
		};
		const response = await fetch(`https://pit.onrender.com/users/${user}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.status === 400) {
			return alert('Erro ao atualizar perfil!');
		}

		if (response.status === 200) {
			alert('Perfil atualizado com sucesso!');
			navigate('/home');
		}
	};

	const handleDelete = async () => {
		const response = await fetch(`https://pit.onrender.com/users/${user}`, {
			method: 'DELETE',
		});

		if (response.status === 400) {
			return alert('Erro ao deletar perfil!');
		}

		if (response.status === 200) {
			alert('Perfil deletado com sucesso!');
			navigate('/');
		}
	};

	return (
		<>
			<main className='mx-auto w-fit flex flex-col gap-2'>
				<h1 className='text-4xl text-center'>Perfil</h1>
				<label htmlFor='name'>
					Name:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label htmlFor='email'>
					Email:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label htmlFor='password'>
					Senha:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<label htmlFor='born'>
					Data de nascimento:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='date'
						name='born'
						id='born'
						value={born}
						onChange={(e) => setBorn(e.target.value)}
					/>
				</label>

				<label htmlFor='degree'>
					Selecione a escolaridade:
					<select
						className='w-full p-2 bg-black/20 rounded'
						name='degree'
						id='degree'
						value={degree}
						onChange={(e) => setDegree(e.target.value)}
					>
						<option value='1'>Ensino Fundamental</option>
						<option value='2'>Ensino Médio</option>
						<option value='3'>Ensino Superior</option>
					</select>
				</label>

				<label htmlFor='genre'>
					Selecione seu gênero:
					<select
						className='w-full p-2 bg-black/20 rounded'
						name='genre'
						id='genre'
						value={genre}
						onChange={(e) => setGenre(e.target.value)}
					>
						<option value='1'>Masculino</option>
						<option value='2'>Feminino</option>
						<option value='3'>Não binário</option>
					</select>
				</label>

				<button
					onClick={handleUpdate}
					className='bg-black/40 mx-auto w-fit px-4 py-2 rounded'
				>
					Atualizar
				</button>

				<button
					onClick={handleDelete}
					className='bg-red-300 mx-auto w-fit px-4 py-2 rounded'
				>
					Deletar conta
				</button>
			</main>
		</>
	);
}
