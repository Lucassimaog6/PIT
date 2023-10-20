import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardProject from "../../Components/Card.Project.jsx";
import HeaderHome from "../../Components/Header.Home.jsx";

export default function Home() {
	const navigate = useNavigate()
	const {isAuthenticated, isLoading} = useAuth0()
	if (!isAuthenticated && !isLoading) navigate('/')

	const [projects, setProjects] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/date`);
			if (!response.ok) return alert('Erro ao buscar projetos');
			const data = await response.json();
			setProjects(data);
		})();
	}, []);

	return (
		<main className='bg-white min-h-screen dark:bg-zinc-900'>
			<HeaderHome/>
			<h1 className='text-4xl text-center col-span-3 p-8'>Adicionados recentemente:</h1>
			{projects.length > 0 ? (
				<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:px-28 px-8'>
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
