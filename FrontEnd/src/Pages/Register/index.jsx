import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const navigate = useNavigate();

	const name = useRef('');
	const email = useRef('');
	const password = useRef('');
	const passwordConfirmation = useRef('');
	const born = useRef('');
	const degree = useRef('');
	const genre = useRef('');

	async function handleSubmit() {
		if (!name.current.value) return alert('Name is required');
		if (!email.current.value) return alert('Email is required');
		if (!password.current.value) return alert('Password is required');
		if (!passwordConfirmation.current.value) return alert('Password confirmation is required');
		if (!born.current.value) return alert('Born is required');
		if (!degree.current.value) return alert('Degree is required');
		if (!genre.current.value) return alert('Genre is required');
		if (password.current.value !== passwordConfirmation.current.value) return alert('Passwords do not match');

		const data = {
			name: name.current.value,
			email: email.current.value,
			password: password.current.value,
			born: born.current.value,
			degree: degree.current.value,
			genre: genre.current.value,
		};

		const response = await fetch('https://pit.onrender.com/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.status !== 201) {
			return alert('Invalid data');
		}

		alert('User created successfully');
		handleLogin();
	}

	const handleLogin = () => {
		navigate('/');
	};

	return (
		<>
			<button
				onClick={handleLogin}
				className='bg-black/40 w-fit mx-auto px-4 py-2 rounded'
			>
				Login
			</button>
			<main className='mx-auto w-fit flex flex-col gap-2'>
				<h1 className='text-center text-4xl'>Registrar</h1>
				<label htmlFor='name'>
					Name:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='text'
						name='name'
						id='name'
						ref={name}
					/>
				</label>
				<label htmlFor='email'>
					Email:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='email'
						name='email'
						id='email'
						ref={email}
					/>
				</label>
				<label htmlFor='password'>
					Senha:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='password'
						name='password'
						id='password'
						ref={password}
					/>
				</label>
				<label htmlFor='password-confirmation'>
					Confirme a senha:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='password'
						name='password-confirmation'
						id='password-confirmation'
						ref={passwordConfirmation}
					/>
				</label>

				<label htmlFor='born'>
					Data de nascimento:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='date'
						name='born'
						id='born'
						ref={born}
					/>
				</label>

				<label htmlFor='degree'>
					Selecione a escolaridade:
					<select
						className='w-full p-2 bg-black/20 rounded'
						name='degree'
						id='degree'
						ref={degree}
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
						ref={genre}
					>
						<option value='1'>Masculino</option>
						<option value='2'>Feminino</option>
						<option value='3'>Não binário</option>
					</select>
				</label>

				<button
					onClick={handleSubmit}
					className='bg-black/40 w-fit mx-auto px-4 py-2 rounded'
				>
					Registrar
				</button>
			</main>
		</>
	);
}
