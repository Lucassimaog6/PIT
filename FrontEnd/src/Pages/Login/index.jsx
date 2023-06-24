import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();

	const email = useRef('');
	const password = useRef('');

	async function handleSubmit(event) {
		event.preventDefault();

		if (!email.current.value) return alert('Email is required');
		if (!password.current.value) return alert('Password is required');

		const response = await fetch('http://localhost:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email.current.value, password: password.current.value }),
		});

		if (response.status !== 200) {
			return alert('Invalid credentials');
		}

		const data = await response.json();

		localStorage.setItem('user', JSON.stringify(data[0]._id));

		navigate('/home');
	}

	return (
		<>
			<main className='mx-auto w-fit flex flex-col gap-2'>
				<h1 className='text-center text-4xl'>Login</h1>
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
					Password:
					<input
						className='w-full p-2 bg-black/20 rounded'
						type='password'
						name='password'
						id='password'
						ref={password}
					/>
				</label>
				<button
					className='bg-black/40 w-fit mx-auto px-4 py-2 rounded'
					onClick={(e) => handleSubmit(e)}
				>
					Login
				</button>
			</main>
		</>
	);
}
