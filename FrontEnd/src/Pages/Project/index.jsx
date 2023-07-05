import {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Project() {
	const navigate = useNavigate();

	const title = useRef('');
	const [dificulty, setDificulty] = useState('');
	const description = useRef('');
	const linkImage = useRef('');

	const handleNewProject = async () => {
		if (dificulty === '') return alert('Selecione uma dificuldade!');
		if (title.current.value === '') return alert('Digite um título!');
		if (description.current.value === '') return alert('Digite uma descrição!');

		const data = {
			title: title.current.value,
			dificulty: dificulty,
			description: description.current.value,
			linkImage: linkImage.current.value,
			owner: localStorage.getItem('id'),
		};

		const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
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
		<div className='min-h-screen flex items-center justify-center'>

			<button className='absolute top-2 left-2 bg-amber-400 py-1 px-2 rounded'
					onClick={() => navigate('/home')}>Voltar
			</button>

			<main className='flex flex-col gap-2'>

				<h1 className='text-center text-6xl'>Novo Projeto</h1>
				<label htmlFor='title'>
					Nome do projeto:
					<input
						className='w-full p-2 bg-black/20 rounded bg-white'
						type='text'
						id='title'
						ref={title}
					/>
				</label>

				<label htmlFor='dificulty' className='flex flex-col'>
					Dificuldade:
					{/*<select*/}
					{/*	className='w-full p-2 bg-black/20 rounded'*/}
					{/*	name='dificulty'*/}
					{/*	id='dificulty'*/}
					{/*	ref={dificulty}*/}
					{/*>*/}
					{/*	<option value='1'>Fácil</option>*/}
					{/*	<option value='2'>Médio</option>*/}
					{/*	<option value='3'>Difícil</option>*/}
					{/*</select>*/}
					<div className="inline-flex rounded-md shadow-sm">
						<button type="button"
								onClick={() => setDificulty("1")}
								className={`${dificulty === "1" ? 'bg-amber-400' : ''} px-4 py-2 w-1/3 text-sm font-medium text-white border border-gray-200 rounded-l-lg bg-yellow-600`}>
							Fácil
						</button>
						<button type="button"
								onClick={() => setDificulty("2")}
								className={`${dificulty === "2" ? 'bg-amber-400' : ''} px-4 py-2 w-1/3 text-sm font-medium text-white border-t border-b border-gray-200 bg-yellow-600`}>
							Médio
						</button>
						<button type="button"
								onClick={() => setDificulty("3")}
								className={`${dificulty === "3" ? 'bg-amber-400' : ''} px-4 py-2 w-1/3 text-sm font-medium text-white border border-gray-200 rounded-l-ld bg-yellow-600`}>
							Difícil
						</button>
					</div>
				</label>

				<label
					className='flex flex-col'
					htmlFor='description'
				>
					Descrição:
					<textarea
						className='p-2 bg-black/20 rounded-md bg-white'
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
						className='w-full p-2 bg-black/20 rounded-md bg-white'
						type='text'
						id='linkImage'
						ref={linkImage}
					/>
				</label>

				<button
					className='w-full p-2 bg-black/40 rounded bg-fuchsia-950 rounded-md'
					onClick={handleNewProject}
				>
					Enviar
				</button>

			</main>
		</div>
	);
}
