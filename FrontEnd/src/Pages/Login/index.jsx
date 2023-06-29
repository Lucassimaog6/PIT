import { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'

export default function Login() {
	const navigate = useNavigate();

	const email = useRef('');
	const password = useRef('');

	async function handleSubmit(event) {
		event.preventDefault();

		if (!email.current.value) return alert('Email is required');
		if (!password.current.value) return alert('Password is required');

		const response = await fetch('https://pit.onrender.com/login', {
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

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const codeParam = urlParams.get('code');
		console.log(codeParam);

		if (codeParam) {
			(async () => {
				const response = await fetch(`http://localhost:8000/login/github_token?code=${codeParam}`, {
					method: 'GET',
				});
				const data = await response.json();
				console.log(data);
				if (data.access_token) {
					alert('Login com Github realizado com sucesso!');
					console.log(data.access_token);
				}
			})();
		}
	}, []);

	const handleGithubLogin = async () => {
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`;
	};

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
				<div className='mx-auto p-2'>
					<Link to='/register'>
						<span className='underline'>Registre-se</span>
					</Link>
				</div>
				<button
					className='bg-black/40 w-fit mx-auto px-4 py-2 rounded'
					onClick={handleGithubLogin}
				>
					Login com Github
				</button>
			</main>
		</>
	);
}
