import { useNavigate } from 'react-router-dom';

export default function CardProject(params) {
    const navigate = useNavigate();

    const project = params.project;
    const ProjectDificulty = project.dificulty;

    let dificultyText = 'Fácil';
    let dificultyColor = 'bg-green-400';
    let description = project.description;
    let title = project.title;
    let tags = project.tags;
    console.log(project)

    switch (ProjectDificulty) {
        case "1":
            dificultyText = 'Fácil';
            dificultyColor = 'bg-green-400';
            break;
        case "2":
            dificultyText = 'Médio';
            dificultyColor = 'bg-orange-600';
            break;
        case "3":
            dificultyText = 'Difícil';
            dificultyColor = 'bg-red-400';
            break;
    }

    return (
        <section className='bg-stone-700 p-8 rounded-xl flex flex-col gap-4 h-fit'>
            <h1 className='text-4xl'>{title}</h1>
            <div className='flex flex-wrap gap-2'>
                <span className={`${dificultyColor} rounded-full text-sm py-0.5 px-3`}>{dificultyText}</span>
                {tags.map((tag) => (
                    <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>{tag}</span>
                ))}
            </div>
            <button onClick={() => navigate(`/p/${project._id}`)} className='bg-slate-600 py-2 px-3 rounded'>Ler mais</button>
        </section>
    );
}
