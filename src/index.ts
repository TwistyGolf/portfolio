import "./style.scss";
import { handleInput, toggleTerminal } from "./terminal";

document.addEventListener("keydown", (e) => {
    handleInput(e);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("close-button").addEventListener("click", () => {
        toggleTerminal();
    });
    const terminalButton = document.querySelector("#terminal-icon>svg");
    terminalButton.classList.add("hide");
    setTimeout(() => {
        terminalButton.classList.remove("hide");
    }, 3000);
    terminalButton.addEventListener("click", () => {
        toggleTerminal();
    });

    const timer = document.querySelector("#time-text>span");
    setInterval(() => {
        timer.textContent = new Date().toLocaleTimeString();
    }, 100);
});
