import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHome from "../../Components/Header.Home";
import CardProject from '../../Components/Card.Project';
import SwitchTheme from '../../Components/SwitchTheme';


export default function Profile() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [born, setBorn] = useState("");
	const [degree, setDegree] = useState("");
	const [genre, setGenre] = useState("");

	const [workingProjects, setWorkingProjects] = useState([]);

	const userId = localStorage.getItem("id");

	useState(() => {
		(async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${userId}`
			);
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

	useState(() => {
		(async () => {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/projects`);
			const _projects = await response.json();

			setWorkingProjects(_projects);
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
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/users/${userId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		if (response.status === 400) {
			return alert("Erro ao atualizar perfil!");
		}

		if (response.status === 200) {
			alert("Perfil atualizado com sucesso!");
			navigate("/home");
		}
	};

	const handleDelete = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/users/${user}`,
			{
				method: "DELETE",
			}
		);

		if (response.status === 400) {
			return alert("Erro ao deletar perfil!");
		}

		if (response.status === 200) {
			alert("Perfil deletado com sucesso!");
			navigate("/");
		}
	};

	return (
		<>
			<HeaderHome />
			<div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[auto_1fr]">
				<main className="flex flex-col gap-2 p-8 bg-zinc-70 rounded-lg">
					<h1 className="text-6xl text-center">Perfil</h1>
					<label htmlFor="name">
						Name:
						<input
							className="w-full p-2 bg-black/20 rounded"
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label htmlFor="email">
						Email:
						<input
							className="w-full p-2 bg-black/20 rounded"
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<label htmlFor="password">
						Senha:
						<input
							className="w-full p-2 bg-black/20 rounded"
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>

					<label htmlFor="born">
						Data de nascimento:
						<input
							className="w-full p-2 bg-black/20 rounded"
							type="date"
							name="born"
							id="born"
							value={born}
							onChange={(e) => setBorn(e.target.value)}
						/>
					</label>

					<label htmlFor="degree">
						Selecione a escolaridade:
						<select
							className="w-full p-2 bg-black/20 rounded"
							name="degree"
							id="degree"
							value={degree}
							onChange={(e) => setDegree(e.target.value)}
						>
							<option value="1">Ensino Fundamental</option>
							<option value="2">Ensino Médio</option>
							<option value="3">Ensino Superior</option>
						</select>
					</label>

					<label htmlFor="genre">
						Selecione seu gênero:
						<select
							className="w-full p-2 bg-black/20 rounded"
							name="genre"
							id="genre"
							value={genre}
							onChange={(e) => setGenre(e.target.value)}
						>
							<option value="1">Masculino</option>
							<option value="2">Feminino</option>
							<option value="3">Não binário</option>
						</select>
					</label>

					<button
						onClick={handleUpdate}
						className="bg-white px-4 py-2 rounded text-black"
					>
						Atualizar
					</button>

					<button
						onClick={handleDelete}
						className="bg-red-700 px-4 py-2 rounded"
					>
						Deletar conta
					</button>
				</main>
				<aside className='p-4 flex flex-col  gap-4'>
					<h1 className='text-4xl text-center'>Projetos Iniciados</h1>
					<div className='grid grid-cols-1 xl:grid-cols-4 gap-4 p-4'>
						{workingProjects.map((p) => (
							<CardProject key={p._id} project={p}/>
						))}
					</div>
				</aside>
			</div>
		</>
	);
}
