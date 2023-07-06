import Sun from '../Assets/sun.svg'
import Moon from '../Assets/moon.svg'
import { useState } from 'react'

export default function SwitchTheme() {
    const [image, setImage] = useState(Moon);

    const changeTheme = () => {
        if (image === Sun) {
            setImage(Moon)
        } else {
            setImage(Sun)
        }
    }

    return (
            <button onClick={changeTheme}>
                <img src={image}/>
            </button>
    )
}