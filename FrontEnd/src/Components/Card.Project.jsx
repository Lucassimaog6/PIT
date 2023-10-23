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
<<<<<<< HEAD
        <section className='bg-stone-700 p-8 rounded-xl flex flex-col gap-4 h-fit'>
            <h1 className='text-4xl'>{title}</h1>
            <div className='flex flex-wrap gap-2'>
                <span className={`${dificultyColor} rounded-full text-sm py-0.5 px-3`}>{dificultyText}</span>
                {tags.map((tag) => (
                    <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>{tag}</span>
                ))}
=======
        <section onClick={() => navigate(`/p/${project._id}`)} className='bg-stone-700 p-8 rounded-xl flex flex-col gap-2 h-fit min-h-[43vh]'>
            <h1 className='text-4xl flex flex-wrap items-center gap-2'>
                {title}
                <div className={`${dificultyColor} rounded-full w-6 h-6 flex items-center justify-center`}>
                    <span className='text-sm font-serif'>{dificultyText}</span>
                </div>
            </h1>
            <div className='flex gap-2 flex-wrap'>
                <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>Tecnologia</span>
                <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>Linguagem</span>
                <span className='bg-purple-500 rounded-full text-sm py-0.5 px-3'>Framework</span>
>>>>>>> 252b240fa15a70c97b75857545c58996f9d3e718
            </div>
            <button onClick={() => navigate(`/p/${project._id}`)} className='bg-slate-600 py-2 px-3 rounded'>Ler mais</button>
        </section>
    );
}
