import {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHome from "../../Components/Header.Home";

export default function Project() {
  const navigate = useNavigate();

  const title = useRef("");
  const [dificulty, setDificulty] = useState("");
  const [stack, setStack] = useState("");
  const description = useRef("");
  const linkImage = useRef("");

  const handleNewProject = async () => {
    if (dificulty === "") return alert("Selecione uma dificuldade!");
    if (stack === "") return alert("Selecione uma Stack!");
    if (title.current.value === "") return alert("Digite um título!");
    if (description.current.value === "") return alert("Digite uma descrição!");

    const data = {
      title: title.current.value,
      dificulty: dificulty,
      description: description.current.value,
      linkImage: linkImage.current.value,
      tags: [stack],
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
        <button
          className="absolute top-2 left-2 bg-zinc-70 py-1 px-2 rounded"
          onClick={() => navigate("/home")}
        >
          Voltar
        </button>

        <main className="flex flex-col gap-2 p-16 bg-zinc-70 rounded-lg mt-0 md:mt-16">
          <h1 className="text-center text-6xl">Novo Projeto</h1>
          <label htmlFor="title">
            Nome do projeto:
            <input
              className="w-full p-2 bg-black/20 rounded text-black"
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
                className={`${
                  dificulty === "1" ? "bg-purple-600" : ""
                } px-4 py-2 w-1/3 text-sm font-medium text-white border border-gray-200 rounded-l-lg `}
              >
                Fácil
              </button>
              <button
                type="button"
                onClick={() => setDificulty("2")}
                className={`${
                  dificulty === "2" ? "bg-purple-600" : ""
                } px-4 py-2 w-1/3 text-sm font-medium text-white border-t border-b border-gray-200 `}
              >
                Médio
              </button>
              <button
                type="button"
                onClick={() => setDificulty("3")}
                className={`${
                  dificulty === "3" ? "bg-purple-600" : ""
                } px-4 py-2 w-1/3 text-sm font-medium text-white border border-gray-200 rounded-r-md `}
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
                onClick={() => setStack("back")}
                className={`${
                  stack === "back" ? "bg-purple-600" : ""
                } px-4 py-2 w-1/2 text-sm font-medium text-white border border-r-0 border-gray-200 rounded-l-lg `}
              >
                BackEnd
              </button>
              <button
                type="button"
                onClick={() => setStack("front")}
                className={`${
                  stack === "front" ? "bg-purple-600" : ""
                } px-4 py-2 w-1/2 text-sm font-medium text-white border border-gray-200 rounded-r-md `}
              >
                FrontEnd
              </button>
            </div>
          </label>

          <label className="flex flex-col" htmlFor="description">
            Descrição:
            <textarea
              className="p-2 bg-black/20 rounded-md text-black"
              name="description"
              id="description"
              cols="30"
              rows="5"
              ref={description}
            ></textarea>
          </label>

          <label htmlFor="linkImage">
            Link da imagem:
            <input
              className="w-full p-2 bg-black/20 rounded-md text-black"
              type="text"
              id="linkImage"
              ref={linkImage}
            />
          </label>

          <button
            className="w-full p-2 bg-black/40 rounded bg-purple-600 rounded-md"
            onClick={handleNewProject}
          >
            Enviar
          </button>
        </main>
      </div>
    </>
  );
}
