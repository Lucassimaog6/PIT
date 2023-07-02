import LandingHeader from "../../Components/Landing.Header.jsx";
import HeroImage from '../../Assets/hero_image.svg'
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Landing() {
    const navigate = useNavigate()
    const {isAuthenticated, user, logout} = useAuth0()

    useEffect(() => {
        if (isAuthenticated) handleLogin()
    }, [isAuthenticated])

    const handleLogin = async () => {
        if (!user) return

        const response = await fetch('http://localhost:8000/login', {
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
            <LandingHeader/>
            <div className='grid grid-cols-2 items-center'>
                <div className='flex flex-col gap-8 text-center px-16'>
                    <h1 className='text-6xl'>Aprenda a programar de forma prática com projetos reais</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consectetur corporis dicta
                        doloribus dolorum earum magnam magni placeat sapiente. Autem, consequuntur deserunt in nulla
                        possimus praesentium quae quod tempore veritatis voluptatibus? Adipisci aperiam deserunt eaque,
                        praesentium repellat tempore temporibus totam!</p>
                </div>
                <img src={HeroImage} alt="Hero image"/>
            </div>
        </main>
    )
}