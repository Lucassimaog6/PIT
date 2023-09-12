import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

export default function HeaderHome() {
    const navigate = useNavigate()
    const { user, logout} = useAuth0()

    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user) setUserName(user.name);
    }, [user]);

    return (
        <header className='grid grid-cols-1 md:grid-cols-[auto_1fr] items-center p-4 bg-slate-500'>
            <p className='text-center p-4 text-2xl'>
                Bem vindo: <span>{userName}</span>
            </p>
            <div className='justify-self-center md:justify-self-end flex gap-4'>
                <button
                    onClick={() => navigate('/project/filter')}
                    className='bg-purple-500 w-fit px-4 py-2 rounded'
                >
                    Filtros
                </button>
                <button
                    onClick={() => navigate('/project/new')}
                    className='bg-purple-500 w-fit px-4 py-2 rounded'
                >
                    Novo Projeto
                </button>
                <button
                    onClick={() => logout()}
                    className='bg-purple-500 w-fit px-4 py-2 rounded'
                >
                    Logout
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className='bg-purple-500 w-fit px-4 py-2 rounded'
                >
                    Perfil
                </button>
            </div>
        </header>
    )
}
