import imagempro from '../Assets/projeto.jpg'
import { useNavigate } from 'react-router-dom';

export default function CardProject(params) {
    const navigate = useNavigate();

    const project = params.project;
    const ProjectDificulty = project.dificulty;

    let dificultyText = 'Fácil';
    let dificultyColor = 'bg-green-400';
    let description = project.description;
    let title = project.title;

    switch (ProjectDificulty) {
        case "1":
            dificultyText = 'I';
            dificultyColor = 'bg-green-400';
            break;
        case "2":
            dificultyText = 'II';
            dificultyColor = 'bg-orange-600';
            break;
        case "3":
            dificultyText = 'III';
            dificultyColor = 'bg-red-400';
            break;
    }

    return (
        <section onClick={() => navigate(`/p/${project._id}`)} className='bg-stone-700 p-8 rounded-xl flex flex-col gap-2 h-fit'>
            <h1 className='text-4xl flex flex-wrap items-center gap-2'>
                {title}
                <div className={`${dificultyColor} rounded-full w-6 h-6 flex items-center justify-center`}>
                    <span className='text-sm font-serif'>{dificultyText}</span>
                </div>
            </h1>
            <div className='flex gap-2'>
                <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>Tecnologia</span>
                <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>Linguagem</span>
                <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>Framework</span>
            </div>
        </section>
    );
}
