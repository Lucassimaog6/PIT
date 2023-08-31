import LogoImage from '../Assets/macaco.png'
import { Link } from 'react-router-dom'
import {useAuth0} from "@auth0/auth0-react";


export default function LandingHeader() {
    const {loginWithRedirect} = useAuth0()

    return (
        <header className='h-fit px-4 flex justify-center md:justify-between items-center'>
            <img className='h-20' src={LogoImage} alt="Logo"/>
            <nav className='hidden md:flex gap-8 items-center'>
                <Link to='#'>
                    <a href="/home"><p>Home</p></a>
                </Link>

                <Link to='#'>
                    <p>Serviços</p>
                </Link>

                <Link to='#'>
                    <p>Sobre Nós</p>
                </Link>

                <Link to='#'>
                    <p>Preços</p>
                </Link>

                <button
                className='bg-stone-700 p-2 px-4 rounded text-zinc-900'
                onClick={() => loginWithRedirect()}>
                Login
            </button>
            </nav>
        </header>
    );
}