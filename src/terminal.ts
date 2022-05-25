import { getText } from "./local";

var currentInputText = "";
var previousInputs: string[] = [];
var previousInputIndex = 0;

var input: HTMLElement;
var terminalText: HTMLElement;

document.addEventListener("DOMContentLoaded", (e) => {
  input = document.getElementById("terminal-input");
  terminalText = document.getElementById("terminal-text");
  typeText(getText("about", "en"));
});

export function handleInput(kb: KeyboardEvent) {
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
      for (var prop in commandDict) {
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
      handleCommand(currentInputText, terminalText);
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

const commandDict: { [key: string]: Function } = {
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

function handleCommand(command: string, terminalText: HTMLElement) {
  createTextElement("> " + command);
  let cmdFunction = commandDict[command.toLocaleLowerCase().trim()];
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
  let el = document.createElement("div");
  let p = document.createElement("p");
  printSentence(p, text);
  el.appendChild(p);
  terminalText.appendChild(el);
  setTimeout(() => {
    var elem = document.getElementById("terminal-content");
    scrollBottom(elem);
  }, 100);
}
function scrollBottom(element: HTMLElement) {
  element.scroll({ top: element.scrollHeight, behavior: "smooth" });
}
export function typeText(text: string[]) {
  text.forEach((t) => {
    createTextElement(t);
  });
}

const printSentence = (element: HTMLElement, sentence: string, speed = 20) => {
  let index = 0;

  let timer = setInterval(function () {
    const char = sentence[index];

    if (char === "<") {
      index = sentence.indexOf(">", index); // skip to greater-than
    }

    element.innerHTML = sentence.slice(0, index);

    if (++index === sentence.length + 1) {
      clearInterval(timer);
    }
  }, speed);
}; // printSentence
