import { useState, useEffect } from 'react';

export default function Filter() {
	const [projects, setProjects] = useState([]);
	const [dificulty, setDificulty] = useState([false, false, false]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/date`);
			setProjects(await response.json());
		})();
	}, []);

	const changeDificulty = (position) => {
		const newDificulty = [...dificulty];
		newDificulty.forEach((d, index) => {
			if (index === position) {
				newDificulty[index] = !d;
			}
		});
		setDificulty(newDificulty);
	};

	const filterProjects = (projects) => {
		if (dificulty[0] && projects.dificulty === '1') {
			return true;
		} else if (dificulty[1] && projects.dificulty === '2') {
			return true;
		} else if (dificulty[2] && projects.dificulty === '3') {
			return true;
		} else {
			return false;
		}
	};

	return (
		<main className='flex flex-col gap-2'>
			<aside>
				<div className='flex flex-col'>
					<h1 className='text-xl'>Dificuldade: </h1>
					<label>
						<input
							onChange={() => changeDificulty(0)}
							checked={dificulty[0]}
							className='mx-2'
							type='checkbox'
						/>
						Fácil
					</label>
					<label>
						<input
							onChange={() => changeDificulty(1)}
							checked={dificulty[1]}
							className='mx-2'
							type='checkbox'
						/>
						Médio
					</label>
					<label>
						<input
							onChange={() => changeDificulty(2)}
							checked={dificulty[2]}
							className='mx-2'
							type='checkbox'
						/>
						Difícil
					</label>
				</div>
			</aside>
			{projects.filter(filterProjects).map((p) => {
				return (
					<div
						key={p._id}
						className='bg-black/40 rounded p-4 m-4'
					>
						<h1 className='text-2xl'>{p.title}</h1>
						<p>{p.description}</p>
						<p>
							Dificuldade: <span>{p.dificulty}</span>
						</p>
					</div>
				);
			})}
		</main>
	);
}
