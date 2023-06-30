export default function Card({ title, description, dificulty }) {
    return (
        <div className="border-4 border-purple-800 p-2">  
            <h1 className="text-3xl">{title} <span className="">{dificulty * "I"}</span></h1>
            <p>{description}</p>
        </div>
    )
}