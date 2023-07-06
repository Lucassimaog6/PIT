import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";
import CardProject from "../../Components/Card.Project.jsx";
import HeaderHome from "../../Components/Header.Home.jsx";

export default function Home() {
	const navigate = useNavigate()
	const {isAuthenticated, isLoading} = useAuth0()
	if (!isAuthenticated && !isLoading) navigate('/')

	const [projects, setProjects] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`http://15.229.86.2:8000/projects/date`);
			if (!response.ok) return alert('Erro ao buscar projetos');
			const data = await response.json();
			setProjects(data);
		})();
	}, []);

	return (
		<main className='bg-zinc-900 min-h-screen'>
			<HeaderHome/>
			<h1 className='text-4xl text-center col-span-3 p-8'>Adicionados recentemente:</h1>
			{projects.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:px-28 px-8'>
					{projects.map((p) => (
						<CardProject key={p._id} project={p} />
					))}
				</div>
			) : (
				<div className='flex justify-center items-center h-screen'>
					<p>Nenhum projeto encontrado</p>
				</div>
			)}
		</main>
	);
}
