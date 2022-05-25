import "./style.scss";
import { handleInput } from "./terminal";

document.addEventListener("keydown", (e) => {
    handleInput(e);
});
