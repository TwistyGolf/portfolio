import "./style.scss";
import { handleInput, toggleTerminal } from "./terminal";

document.addEventListener("keydown", (e) => {
    handleInput(e);
});

const blockedKeys = [
    "Space",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
];

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
    //Prevent Arrow keys
    window.addEventListener(
        "keydown",
        function (e) {
            if (blockedKeys.includes(e.code)) {
                e.preventDefault();
            }
        },
        false
    );
});
