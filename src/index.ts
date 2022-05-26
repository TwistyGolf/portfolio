import "./style.scss";
import { handleInput, toggleTerminal } from "./terminal";

document.addEventListener("keydown", (e) => {
    handleInput(e);
});

document.addEventListener("DOMContentLoaded", () => {
    const terminalButton = document.querySelector("#terminal-icon>svg");
    terminalButton.addEventListener("click", () => {
        toggleTerminal();
    });
    document.getElementById("close-button").addEventListener("click", () => {
        toggleTerminal();
    });

    setTimeout(() => {
        terminalButton.classList.remove("hidden");
    }, 3000);

    // Updates the time text
    const timer = document.querySelector("#time-text>span");
    setInterval(() => {
        timer.textContent = new Date().toLocaleTimeString();
    }, 100);
});
