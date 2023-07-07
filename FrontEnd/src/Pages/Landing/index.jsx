import LandingHeader from "../../Components/Landing.Header.jsx";
import HeroImage from '../../Assets/hero_image.svg'
import programas from '../../Assets/programas.png'
import banana from '../../Assets/banana.png'
import chat from '../../Assets/chat.png'
import code from '../../Assets/code.png'
import share from '../../Assets/share.png'
import {useAuth0} from "@auth0/auth0-react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Landing() {
    const navigate = useNavigate()
    const {isAuthenticated, user, logout} = useAuth0()

    useEffect(() => {
        if (isAuthenticated) handleLogin()
    }, [isAuthenticated])

    const handleLogin = async () => {
        if (!user) return

        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.sub
            })
        })

        if(!response.ok) return alert('Erro ao logar')

        const data = await response.json()

        await localStorage.setItem('id', data[0]._id)

        navigate('/home')
    }


    return (
        <main className=' min-h-screen bg-zinc-900 grid grid-rows-[auto_1f]'>
            <LandingHeader />

            

        <div className="flex flex-col md:flex-row bg-amber-400 items-center justify-center h-64 gap-24">
            <div className="w-full md:w-1/2">
                <div className="flex items-center justify-center h-full flex-col font-bold text-2xl">
                <img src={programas} />
                <p>Seu melhor amigo para o aprendizado prático</p>
                </div>
            </div>
                <img src={banana} className="h-full" />
        </div>

        <div className="flex flex-wrap justify-center py-8">
            <div className="w-1/3 md:w-1/4 lg:w-1/4 p-4 flex justify-center">
                <div className="rounded-lg shadow text-center h-full flex flex-col items-center justify-center">
                    <img src={code} alt="Imagem" />
                    <div className="p-4">
                    <p className="text-lg font-bold">Veja e Code</p>
                    <p className="text-sm">Comece o desafio baixando os arquivos. Nos te damos todos os arquivos necessários para você finalizar o projeto.</p>
                    </div>
                </div>
            </div>
            <div className="w-1/3 md:w-1/4 lg:w-1/4 p-4 flex justify-center">
                <div className="rounded-lg shadow text-center h-full flex flex-col items-center justify-center">
                    <img src={share} alt="Imagem" />
                    <div className="p-4">
                    <p className="text-lg font-bold">Envie a solução</p>
                    <p className="text-sm">Poste sua solução na nossa plataforma para que todos possam ver e dar um feedback em nossa comunidade.</p>
                    </div>
                </div>
            </div>
            <div className="w-1/3 md:w-1/4 lg:w-1/4 p-4 flex justify-center">
                <div className="rounded-lg shadow text-center h-full flex flex-col items-center justify-center">
                    <img src={chat} alt="Imagem" />
                    <div className="p-4">
                    <p className="text-lg font-bold">Dê feedbacks</p>
                    <p className="text-sm">Tenha pensamento crítico sobre o código de outros e ajude-os a melhorarem seus códigos com a comunidade.</p>
                    </div>
                </div>
            </div>
        </div>


            <div className='grid grid-cols-1 lg:grid-cols-2 items-center'>
                <div className='flex flex-col gap-8 text-center px-4 md:px-16'>
                    <h1 className='text-4xl md:text-6xl'>Aprenda a programar de forma prática com projetos reais</h1>
                    <p className='text-sm md:text-xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consectetur corporis dicta
                        doloribus dolorum earum magnam magni placeat sapiente. Autem, consequuntur deserunt in nulla
                        possimus praesentium quae quod tempore veritatis voluptatibus? Adipisci aperiam deserunt eaque,
                        praesentium repellat tempore temporibus totam!</p>
                </div>
            </div>
            <div className='md:hidden mx-auto'>
                <nav className='flex gap-8'>
                    <Link to='#'>
                        <p className='underline'>Home</p>
                    </Link>

                    <Link to='#'>
                        <p className='underline'>Serviços</p>
                    </Link>

                    <Link to='#'>
                        <p className='underline'>Sobre Nós</p>
                    </Link>

                    <Link to='#'>
                        <p className='underline'>Preços</p>
                    </Link>
                </nav>
            </div>
        </main>
    )
}