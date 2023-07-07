import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

export default function ProjectID() {
    const {id} = useParams()
    const [project, setProject] = useState()
    const [dificultyText, setDificultyText] = useState()
    const [dificultyColor, setDificultyColor] = useState()
    const [owner, setOwner] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);
            const data = await response.json()
            setProject(data)

            switch (data.dificulty) {
                case "1":
                    setDificultyColor('bg-green-400');
                    setDificultyText('I');
                    break;
                case "2":
                    setDificultyColor('bg-orange-600');
                    setDificultyText('II');
                    break;
                case "3":
                    setDificultyColor('bg-red-400');
                    setDificultyText('III');
                    break;
            }
            getOwner(data.owner)
        })()
    }, [])

    async function getOwner(ownerId) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${ownerId}`);
        const data = await response.json()
        setOwner(data.name)
    }


    return (
        project ? (
            <>
                <button className='m-2 bg-amber-500 py-1 px-2 rounded'
                        onClick={() => navigate('/home')}>Voltar
                </button>
                <main className='min-h-screen grid items-center justify-center'>
                    <div className='bg-white/20 p-4 rounded-lg'>
                        <h1 className='text-6xl'>Título: {project.title}</h1>
                        <p className='text-2xl'>Descrição do projeto: {project.description}</p>
                        <label className='flex gap-2'>Nível:
                            <div className={`${dificultyColor} rounded-full w-6 h-6 flex items-center justify-center`}>
                                <span className='text-sm font-serif'>{dificultyText}</span>
                            </div>
                        </label>
                        <p className='text-2xl'>Stack: {project.tags[0] === 'back' ? 'BackEnd' : 'FrontEnd'}</p>
                        <p>Autor: {owner}</p>
                    </div>
                </main>
            </>

        ) : (
            <h1>carregando</h1>
        )
    )
}