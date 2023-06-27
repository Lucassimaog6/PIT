import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Project() {
	const navigate = useNavigate();

	const title = useRef('');
	const dificulty = useRef('');
	const description = useRef('');
	const linkImage = useRef('');

	const handleNewProject = async () => {
		const data = {
			title: title.current.value,
			dificulty: dificulty.current.value,
			description: description.current.value,
			linkImage: linkImage.current.value,
			owner: JSON.parse(localStorage.getItem('user')),
		};

		const response = await fetch('http://localhost:8000/projects', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const data = await response.json();
			console.log(data);
			return alert('Erro ao criar projeto!');
		}

		alert('Projeto criado com sucesso!');
		navigate('/home');
	};

	return (
		<main className='mx-auto w-fit flex flex-col gap-2'>
			<h1 className='text-center text-4xl'>Novo Projeto</h1>
			<label htmlFor='title'>
				Nome do projeto:
				<input
					className='w-full p-2 bg-black/20 rounded'
					type='text'
					id='title'
					ref={title}
				/>
			</label>

			<label htmlFor='dificulty'>
				Dificuldade:
				<select
					className='w-full p-2 bg-black/20 rounded'
					name='dificulty'
					id='dificulty'
					ref={dificulty}
				>
					<option value='1'>Fácil</option>
					<option value='2'>Médio</option>
					<option value='3'>Difícil</option>
				</select>
			</label>

			<label
				className='flex flex-col'
				htmlFor='description'
			>
				Descrição:
				<textarea
					className='p-2 bg-black/20 rounded '
					name='description'
					id='description'
					cols='30'
					rows='5'
					ref={description}
				></textarea>
			</label>

			<label htmlFor='linkImage'>
				Link da imagem:
				<input
					className='w-full p-2 bg-black/20 rounded'
					type='text'
					id='linkImage'
					ref={linkImage}
				/>
			</label>

			<button
				className='w-full p-2 bg-black/40 rounded'
				onClick={handleNewProject}
			>
				Enviar
			</button>
		</main>
	);
}
