import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderHome() {  
    const navigate = useNavigate()
    const { user, logout} = useAuth0()

    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user) setUserName(user.name);
    }, [user]);

    return (
<<<<<<< HEAD
        <header className='grid grid-cols-1 md:grid-cols-[auto_auto_1fr] items-center p-4 bg-stone-700 dark:bg-stone-500'>
            <button className='m-2 bg-purple-600 py-2 px-3 rounded' onClick={() => navigate('/home')}>
                Home
=======
        <header className='grid grid-cols-1 md:grid-cols-[auto_auto_1fr] items-center p-4 bg-stone-500 dark:bg-zinc-700'>
            <button className='m-2 bg-white py-2 px-3 rounded text-black' onClick={() => navigate(-1)}>
                Voltar
>>>>>>> 252b240fa15a70c97b75857545c58996f9d3e718
            </button>

            <p className='text-center p-4 text-2xl'>
                Bem vindo: <span>{userName}</span>
            </p>
            
            <div className='justify-self-center md:justify-self-end flex gap-4'>
                <button
                    onClick={() => navigate('/project/filter')}
                    className='bg-white w-fit px-4 py-2 rounded text-black'
                >
                    Filtros
                </button>
                <button
                    onClick={() => navigate('/project/new')}
                    className='bg-white w-fit px-4 py-2 rounded text-black'
                >
                    Novo Projeto
                </button>
                <button
<<<<<<< HEAD
                    onClick={() => logout({
                        logoutParams: {
                            returnTo: window.location.origin
                        }
                    })}
                    className='bg-purple-500 w-fit px-4 py-2 rounded'
=======
                    onClick={() => logout()}
                    className='bg-white w-fit px-4 py-2 rounded text-black'
>>>>>>> 252b240fa15a70c97b75857545c58996f9d3e718
                >
                    Logout
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className='bg-white w-fit px-4 py-2 rounded text-black'
                >
                    Perfil
                </button>
            </div>
        </header>
    )
}
