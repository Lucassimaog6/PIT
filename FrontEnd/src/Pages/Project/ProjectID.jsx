import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProjectID() {
    const { id } = useParams()
    const [project, setProject] = useState()
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://15.229.86.2:8000/projects/${id}`);
            const data = await response.json()
            setProject(data)
        })()
    }, [])


    return (
        project ? (
            <main>

            </main>
        
        ) : (
            <h1>carregando</h1>
        )
    )
}