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
            <div>
                <h1>{project.title}</h1>
            </div>
        
        ) : (
            <h1>carregando</h1>
        )
    )
}