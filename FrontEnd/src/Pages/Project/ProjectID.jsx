import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import HeaderHome from "../../Components/Header.Home"
import {useAuth0} from "@auth0/auth0-react";

export default function ProjectID() {
    const { id } = useParams()
    const [project, setProject] = useState()
    const [dificultyText, setDificultyText] = useState()
    const [dificultyColor, setDificultyColor] = useState()
    const [owner, setOwner] = useState()
    const [comments, setComments] = useState([])
    const [isWorking, setIsWorking] = useState(false)
    const newComment = useRef()
    const { user } = useAuth0()

    async function getOwner(ownerId) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${ownerId}`);
        const data = await response.json()
        setOwner(data.name)
    }

    async function handleNewComment() {
        console.log(newComment.current.value)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: newComment.current.value
            })
        })

        const data = await response.json()
        console.log(data)

        if (response.ok) {
            setComments([...comments, data])
        } else {
            alert(data.message)
        }

        newComment.current.value = ''
    }

    async function handleAlreadyAssigned() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/working/verify/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: user.email
            })
        })

        const data = await response.json()
        console.log(data)

        if (response.ok) {
            setIsWorking(data)
        }
    }
    handleAlreadyAssigned() 


    async function handleAssign() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/working/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: user.email
            })
        })

        const data = await response.json()
        console.log(data)

        if (response.ok) {
            alert('Projeto iniciado com sucesso!')
        } else {
            alert(data.message)
        }
    }

    async function handleDeleteProject() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);
            const data = await response.json()
            setProject(data)

            switch (data.dificulty) {
                case "1":
                    setDificultyColor('bg-green-400');
                    setDificultyText('Fácil');
                    break;
                case "2":
                    setDificultyColor('bg-orange-600');
                    setDificultyText('Medio');
                    break;
                case "3":
                    setDificultyColor('bg-red-400');
                    setDificultyText('Difícil');
                    break;
            }
            console.log(data)
            getOwner(data.owner)
            setComments(data.comments)
        })()
    }, [])

    return (
        project ? (
            <>
                <HeaderHome />
                <main className='m-8 w-full md:w-3/5 xl:w-2/5 mx-auto p-4 grid items-center justify-center bg-slate-400'>
                    <div className='bg-white/20 p-4 rounded-lg'>
                        <h1 className='text-5xl text-center py-4'>{project.title}</h1>
                        <div className={`w-fit ${dificultyColor} rounded-full py-0.5 px-3 mb-4 flex items-center justify-center`}>
                            <span className='text-sm'>{dificultyText}</span>
                        </div>
                        <p className='text-2xl'>{project.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet quaerat corrupti nobis voluptate quod pariatur perferendis sint. Esse id aperiam natus est at, accusantium excepturi facere voluptas dolorem odit nisi?</p>
                        <label className='flex gap-2'>

                        </label>
                        <p className='text-2xl'>Stack: {project.tags[0] === 'back' ? 'BackEnd' : 'FrontEnd'}</p>
                        <p>Autor: {owner}</p>
                    </div>

                    {!isWorking ? (
                        <button className="mx-auto mt-4 bg-purple-500 w-fit px-4 py-2 rounded" onClick={() => handleAssign()}>
                        Iniciar Projeto
                        </button>
                    ) : null}


                
                    <div className="gap-4 flex flex-col p-4">                       
                        <h1>Digite seu comentário:</h1>
                        <div className="grid grid-cols-[1fr_auto] gap-4">
                            <input type="text" id="comment" className="p-2 bg-white/20 rounded-md text-white" ref={newComment} />
                            <button onClick={() => handleNewComment()} className="bg-purple-500 w-fit px-4 py-2 rounded">
                                Enviar
                            </button>
                        </div>
                        <ul className="flex flex-col gap-2 ">
                            {comments.map((c) => {
                                if (c) return (
                                    <div className="bg-white/10 p-2 rounded">
                                        <p>{c}</p>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </main>
            </>
        ) : (
            <>
                <HeaderHome />
                    <main className='min-h-screen grid justify-center items-center'>
                        <h1 className='text-6xl'>carregando</h1>
                    </main>                
            </>
        )
    )
}
