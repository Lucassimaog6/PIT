import { useState, useEffect } from 'react';
import CardProjects from '../../Components/Card.Project';
import {useNavigate} from 'react-router-dom';
import HeaderHome from '../../Components/Header.Home';

export default function Filter() {
	const navigate = useNavigate();

	const [projects, setProjects] = useState([]);
	const [dificulty, setDificulty] = useState([false, false, false]);
	const [stack, setStack] = useState('')

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
		console.log(projects)
	};

	const filterDificulty = (projects) => {
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

	const changeStack = (_stack) => {
		if (stack === _stack) {
			setStack('')
		} else {
			setStack(_stack)
		}
	}

	const filterStack = (projects) => {
		if (projects.tags.includes(stack)) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<>
		<HeaderHome/>
		<main className='flex flex-wrap grid-cols-[auto_1fr] md:grid'>
			<div className="absolute top-4 right-4">
			<SwitchTheme />
			</div>
			<aside className='min-h-0 md:min-h-screen p-4'>
			<section className='flex flex-col mt-5'>
				{/* Dificuldade */}
				<h1 className='text-xl justify-center items-center'>Dificuldade</h1>
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
			</section>

			<div className='flex flex-col mt-2.5'>
				{/* Linguagens */}
				<h1 className='text-xl justify-center items-center'>Linguagens</h1>
				<label>
					<input
						onChange={() => changeStack('front')}
						checked={stack === 'front'}
						className='mx-2'
						type='checkbox'
					/>
					FrontEnd
				</label>
				<label>
					<input
						onChange={() => changeStack('back')}
						checked={stack === 'back'}
						className='mx-2'
						type='checkbox'
					/>
					BackEnd
				</label>
			</div>
			</aside>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-8 min-h-0 md:min-h-screen'>
				{projects.filter(filterDificulty).filter(filterStack).map((p) => {
					return (
						<CardProjects key={p._id} project={p} />
					);
				})}
			</div>

		</main>
		</>
	);
}
