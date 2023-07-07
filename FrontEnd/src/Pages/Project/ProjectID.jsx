import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProjectID() {
    const { id } = useParams()
    const [project, setProject] = useState()
    
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
                <section>
            <img
                className="h-48" src={imagempro} alt="Imagem Projeto" />
            <h1 className='text-4xl flex flex-wrap items-center gap-2'>
                {title}
                <div className={`${dificultyColor} rounded-full w-6 h-6 flex items-center justify-center`}>
                    <span className='text-sm font-serif'>{dificultyText}</span>
                </div>
            </h1>
            <div className='flex gap-2'>
                <span className='bg-purple-600 rounded-full text-sm py-0.5 px-3'>Tecnologia</span>
                <span className='bg-purple-600 rounded-full text-sm py-0.5 px-3'>Linguagem</span>
                <span className='bg-purple-600 rounded-full text-sm py-0.5 px-3'>Framework</span>
            </div>
            <p>
                {description}
            </p>
        </section>
            </main>
        
        ) : (
            <h1>carregando</h1>
        )
    )
}