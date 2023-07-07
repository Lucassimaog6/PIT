import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useNavigate} from 'react-router-dom';

export default function ProjectID() {
    const { id } = useParams()
    const [project, setProject] = useState()
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);
            const data = await response.json()
            setProject(data)
        })()
    }, [])


    return (
        project ? (
            <main>
                <button className='bg-amber-500 py-1 px-2 rounded'
                    onClick={() => navigate('/home')}>Voltar
                </button>
                <div>Seu projeto</div>
            </main>
        
        ) : (
            <h1>carregando</h1>
        )
    )
}