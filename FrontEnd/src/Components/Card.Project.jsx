export default function CardProject(params) {
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
            dificultyColor = 'bg-yellow-400';
            break;
        case "3":
            dificultyText = 'III';
            dificultyColor = 'bg-red-400';
            break;
    }

    return (
        <section className='flex flex-wrap bg-zinc-800 p-4 rounded-xl flex flex-col gap-2 border-4 border-amber-400'>
            <h1 className='text-4xl flex items-center gap-2'>
                {title}
                <div className={`${dificultyColor} rounded-full w-6 h-6 flex items-center justify-center`}>
                    <span className='text-sm font-serif'>{dificultyText}</span>
                </div>
            </h1>
            <div className='flex gap-2'>
                <span className='bg-amber-400 rounded-full text-sm py-0.5 px-3'>Tecnologia</span>
                <span className='bg-amber-400 rounded-full text-sm py-0.5 px-3'>Linguagem</span>
                <span className='bg-amber-400 rounded-full text-sm py-0.5 px-3'>Framework</span>
            </div>
            <p>
                {description}
            </p>
        </section>
    );
}
