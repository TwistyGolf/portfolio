import { getText } from "./locale";

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
            for (const prop in commandDict) {
                if (Object.prototype.hasOwnProperty.call(commandDict, prop)) {
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
            console.log(previousInputIndex);
            break;
        default:
            break;
    }
    input.textContent = currentInputText;
}

const commandDict: { [key: string]: () => string[] } = {
    about: () => {
        return getText("about", "en");
    },
    help: () => {
        return getText("help", "en");
    },
    education: () => {
        return getText("education", "en");
    },
    contact: () => {
        return getText("contact", "en");
    },
    experience: () => {
        return getText("experience", "en");
    },
    clear: (): string[] => {
        terminalText.replaceChildren();
        return [];
    },
};

function handleCommand(command: string) {
    createTextElement("> " + command);
    const cmdFunction = commandDict[command.toLocaleLowerCase().trim()];
    if (cmdFunction != undefined) {
        typeText(cmdFunction());
    } else {
        typeText([
            "<span class='red glow'>I didn't understand '" +
                command +
                "' try 'help' for a command list</span>",
        ]);
    }
}

function createTextElement(text: string) {
    const el = document.createElement("div");
    const p = document.createElement("p");
    printSentence(p, text);
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
    inputAvailable = false;
    const promises: Promise<void>[] = [];
    text.forEach((t, index) => {
        promises.push(
            new Promise<void>((resolve) => {
                setTimeout(function () {
                    createTextElement(t);
                    console.log(index);

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
            typeText(getText("intro", "en", false)).then(() => {
                typeText(getText("about", "en")).then(() => {
                    typeText(getText("helper", "en"));
                });
            });
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
