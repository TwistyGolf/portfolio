import { getText } from "./locale";
import { commands } from "./commands";

let inputAvailable = true;

let currentInputText = "";
const previousInputs: string[] = [];
let previousInputIndex = 0;

let input: HTMLElement;
let terminalText: HTMLElement;
let terminalWindow: HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
    input = document.getElementById("terminal-input");
    terminalText = document.getElementById("terminal-text");
    terminalWindow = document.getElementById("terminal");
});

export function handleInput(kb: KeyboardEvent) {
    if (!inputAvailable) return;
    let ctrlHeld = false;
    if (kb.getModifierState("Control")) {
        kb.preventDefault();
        ctrlHeld = true;
    }
    if (kb.key.length == 1) {
        currentInputText += kb.key;
    }
    switch (kb.key) {
        case "Backspace":
            if (currentInputText.length > 0) {
                currentInputText = currentInputText.substring(
                    0,
                    ctrlHeld ? 0 : currentInputText.length - 1
                );
            }
            break;
        case "Tab":
            kb.preventDefault();
            if (currentInputText == "") break;
            for (const prop in commands) {
                if (Object.prototype.hasOwnProperty.call(commands, prop)) {
                    if (prop.startsWith(currentInputText)) {
                        currentInputText = prop;
                    }
                }
            }
            break;
        case "Shift":
            break;
        case "Enter":
            if (currentInputText.length == 0) break;
            previousInputs.push(currentInputText);
            previousInputIndex = previousInputs.length - 1;
            handleCommand(currentInputText);
            currentInputText = "";
            break;
        case "ArrowUp":
            if (previousInputs.length == 0 || previousInputIndex < 0) break;
            currentInputText = previousInputs[previousInputIndex];
            previousInputIndex -= 1;
            console.log(previousInputIndex);
            break;
        case "ArrowDown":
            previousInputIndex += 1;
            if (
                previousInputs.length == 0 ||
                previousInputIndex >= previousInputs.length
            ) {
                previousInputIndex = previousInputs.length - 1;
                break;
            }
            currentInputText = previousInputs[previousInputIndex];
            break;
        default:
            break;
    }
    input.textContent = currentInputText;
}

function handleCommand(command: string) {
    createTextElement("> " + command);

    const cmdParts = command.trim().split(" ");
    const cmd = cmdParts[0].toLocaleLowerCase().trim();
    const args = cmdParts.splice(1);

    if (cmd in commands) {
        try {
            const text = commands[cmd].call(...args);
            typeText(text);
        } catch (e) {
            typeError("Error running command:", e.message);
        }
    } else {
        typeError(
            "I didn't understand '" +
                command +
                "' try 'help' for a command list"
        );
    }
}

export function typeError(text: string, reason = "") {
    typeText([`<span class='red glow'>${text}</span> ${reason}`]);
}

export function clearTerminal() {
    terminalText.replaceChildren();
}

export function createTextElement(text: string, typed = true) {
    const el = document.createElement("div");
    const p = document.createElement("p");
    if (typed) {
        printSentence(p, text);
    } else {
        p.textContent = text;
    }
    el.appendChild(p);
    terminalText.appendChild(el);
    const elem = document.getElementById("terminal-content");
    setTimeout(() => {
        scrollBottom(elem);
    }, 100);
}

function scrollBottom(element: HTMLElement) {
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
}

export function typeText(text: string[]): Promise<void[]> {
    if (text.length == 0) {
        return;
    }
    text.push(" ");
    inputAvailable = false;
    const promises: Promise<void>[] = [];
    text.forEach((t, index) => {
        promises.push(
            new Promise<void>((resolve) => {
                setTimeout(function () {
                    createTextElement(t);

                    if (index == text.length - 1) {
                        inputAvailable = true;
                    }
                    resolve();
                }, index * 100);
            })
        );
    });
    return Promise.all(promises);
}
let firstOpen = true;

export function toggleTerminal() {
    if (terminalWindow.classList.contains("hide")) {
        if (firstOpen) {
            firstOpen = false;
            typeMultiple(
                getText("intro", "en", false),
                getText("about", "en"),
                getText("helper", "en")
            );
        }
        terminalWindow.classList.remove("hidden");
        setTimeout(() => {
            terminalWindow.classList.remove("hide");
        }, 200);
    } else {
        setTimeout(() => {
            terminalWindow.classList.add("hidden");
        }, 200);
        terminalWindow.classList.add("hide");
    }
}

async function typeMultiple(...texts: string[][]) {
    for (let index = 0; index < texts.length; index++) {
        const element = texts[index];
        await typeText(element);
    }
}

const printSentence = (element: HTMLElement, sentence: string, speed = 20) => {
    let index = 0;

    const timer = setInterval(function () {
        const char = sentence[index];

        if (char === "<") {
            index = sentence.indexOf(">", index); // skip to greater-than
        }

        element.innerHTML = sentence.slice(0, index);

        if (++index === sentence.length + 1) {
            clearInterval(timer);
        }
    }, speed);
};
