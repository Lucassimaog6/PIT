import { useState } from "react";
import Moon from "../Assets/moon.svg";
import Sun from "../Assets/sun.svg";

export default function SwitchTheme() {
  const [image, setImage] = useState(Moon);

  const changeTheme = () => {
    if (image === Sun) {
      setImage(Moon);
      document.body.classList.add("dark");
    } else {
      setImage(Sun);
      document.body.classList.remove("dark");
    }
  };

  return (
    <button onClick={changeTheme}>
      <img src={image} />
    </button>
  );
}
