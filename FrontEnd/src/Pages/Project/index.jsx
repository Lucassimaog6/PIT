import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHome from "../../Components/Header.Home";

export default function Project() {
	const navigate = useNavigate();

	const title = useRef("");
	const [dificulty, setDificulty] = useState("");
	const [stack, setStack] = useState("");
	const description = useRef("");
	const linkImage = useRef("");
	const tags = useRef("");

	const handleNewProject = async () => {
		if (dificulty === "") return alert("Selecione uma dificuldade!");
		if (stack === "") return alert("Selecione uma Stack!");
		if (title.current.value === "") return alert("Digite um título!");
		if (description.current.value === "") return alert("Digite uma descrição!");
		if (tags.current.value === "") return alert("Digite as tags!");

		const tagsArray = tags.current.value.replace(' ', '').split(",");

		const data = {
			title: title.current.value,
			dificulty: dificulty,
			description: description.current.value,
			linkImage: linkImage.current.value,
			tags: [stack, ...tagsArray],
			owner: localStorage.getItem("id"),
		};

		const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const data = await response.json();
			console.log(data);
			return alert("Erro ao criar projeto!");
		}

		alert("Projeto criado com sucesso!");
		navigate("/home");
	};

	return (
		<>
			<HeaderHome />
			<div className="min-h-screen flex items-center justify-center">
				<main className="flex flex-col gap-2 p-16 bg-zinc-800 rounded-lg mt-0 md:mt-16 ">
					<h1 className="text-center text-6xl">Novo Projeto</h1>
					<label htmlFor="title">
						Nome do projeto:
						<input
							className="w-full p-2 bg-white/20 rounded text-white"
							type="text"
							id="title"
							ref={title}
						/>
					</label>

					<label htmlFor="dificulty" className="flex flex-col">
						Dificuldade:
						<div className="inline-flex rounded-md shadow-sm">
							<button
								type="button"
								onClick={() => setDificulty("1")}
								className={`${dificulty === "1" ? "bg-purple-500" : "bg-white/20"
									}  px-4 py-2 w-1/3 text-sm font-medium text-white border border-gray-200 rounded-l-lg text-black`}
							>
								Fácil
							</button>
							<button
								type="button"
								onClick={() => setDificulty("2")}
								className={`${dificulty === "2" ? "bg-purple-500 " : "bg-white/20"
									}  px-4 py-2 w-1/3 text-sm font-medium text-white border-t border-b border-gray-200 text-black`}
							>
								Médio
							</button>
							<button
								type="button"
								onClick={() => setDificulty("3")}
								className={`${dificulty === "3" ? "bg-purple-500" : "bg-white/20"
									}  px-4 py-2 w-1/3 text-sm font-medium text-white border border-gray-200 rounded-r-md text-black`}
							>
								Difícil
							</button>
						</div>
					</label>

					<label htmlFor="stack" className="flex flex-col">
						Stack:
						<div className="inline-flex rounded-md shadow-sm">
							<button
								type="button"
<<<<<<< HEAD
								onClick={() => setStack("front")}
								className={`${stack === "front" ? "bg-purple-500" : "bg-white/20"
=======
								onClick={() => setStack("back")}
								className={`${stack === "back" ? "bg-purple-500 text-black" : "bg-white/20"
>>>>>>> 252b240fa15a70c97b75857545c58996f9d3e718
									}  px-4 py-2 w-1/2 text-sm font-medium text-white border border-r-0 border-gray-200 rounded-l-lg `}
							>
								FrontEnd
							</button>
							<button
								type="button"
<<<<<<< HEAD
								onClick={() => setStack("back")}
								className={`${stack === "back" ? "bg-purple-500" : "bg-white/20"
									}  px-4 py-2 w-1/2 text-sm font-medium text-white border border-gray-200 rounded-r-md`}
=======
								onClick={() => setStack("front")}
								className={`${stack === "front" ? "bg-purple-500 text-black" : "bg-white/20"
									}  px-4 py-2 w-1/2 text-sm font-medium text-white border border-gray-200 rounded-r-md `}
>>>>>>> 252b240fa15a70c97b75857545c58996f9d3e718
							>
								BackEnd
							</button>
						</div>
					</label>

					<label className="flex flex-col" htmlFor="description">
						Descrição:
						<textarea
							className="p-2 bg-white/20 rounded-md text-white"
							name="description"
							id="description"
							cols="30"
							rows="5"
							ref={description}
						></textarea>
					</label>
					
					<div className='hidden'>					
						<label htmlFor="linkImage">
							Link da imagem:
							<input
								className="w-full p-2 bg-white/20 rounded-md text-white"
								type="text"
								id="linkImage"
								ref={linkImage}
							/>
						</label>
					</div>

					<label htmlFor="tags">
						Digite suas tags separadas por vírgula:
						<input
							className="w-full p-2 bg-white/20 rounded-md text-white"
							placeholder='react, node, css, html, javascript'
							type="text"
							id="tags"
							ref={tags}
						/>
					</label>

					

					<button
						className="w-full p-2 bg-white rounded-md text-black"
						onClick={handleNewProject}
					>
						Enviar
					</button>
				</main>
			</div>
		</>
	);
}
