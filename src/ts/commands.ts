import { getText } from "./locale";
import { parseText } from "./stringParser";
import { skills } from "./skills";

import {
    bindCallback,
    clearTerminal,
    createTextElement,
    typeError,
    typeText,
} from "./terminal";
import { projects } from "./projects";
import { IDictonary } from "./interfaces";

class Command {
    name: string;
    hidden: boolean;
    handler: (...args: string[]) => void;

    constructor(
        name: string,
        handler: (...args: string[]) => void,
        hidden = false
    ) {
        this.name = name;
        this.handler = handler;
        this.hidden = hidden;
    }

    call(...args: string[]) {
        return this.handler(...args);
    }

    description() {
        return getText(this.name + "Desc");
    }

    usage() {
        return getText(this.name + "Usage", false);
    }
}

export const commands: IDictonary<Command> = {
    about: new Command("about", aboutHandler),
    help: new Command("help", helpHandler),
    contact: new Command("contact", contactHandler),
    education: new Command("education", educationHandler),
    experience: new Command("experience", experienceHandler),
    projects: new Command("projects", projectsHandler),
    clear: new Command("clear", clearHandler),
    skills: new Command("skills", skillsHandler),
    image: new Command("image", imageHandler, true),
};

function aboutHandler() {
    typeText(getText("about"));
}

function helpHandler(...args: string[]) {
    if (args.length == 0) {
        const lines: string[] = [];
        for (const command in commands) {
            const commandObj = commands[command];
            if (commandObj.hidden) continue;

            lines.push(
                parseText(
                    `<glow/red>${command}:</> ${commandObj.description()}</>`
                )
            );
        }
        typeText(lines);
    } else {
        const command = args[0].trim().toLocaleLowerCase();
        if (command in commands) {
            typeText([`Usage: ${commands[command].usage()}`]);
        } else {
            typeError(`Command '${command}' doesn't exist`);
        }
    }
}

function educationHandler() {
    typeText(getText("education"));
}

function contactHandler() {
    typeText(getText("contact"));
}

function clearHandler() {
    clearTerminal();
}

function experienceHandler() {
    typeText(getText("experience"));
}

function skillsHandler() {
    const maxLength = Math.max(...skills.map((x) => x.name.length)) + 1;
    const lines: string[] = [];
    skills.forEach((x) => {
        let line = x.name;
        line += " ".repeat(maxLength - line.length);
        line += x.getRatingString();
        lines.push(line);
    });
    typeText(lines);
}

async function projectsHandler(...args: string[]) {
    if (args.length == 0) {
        bindCallback((x) => {
            showProject(...x);
        });
        showExistingProjects();
    } else {
        showProject(...args);
    }
}

function showExistingProjects() {
    const lines: string[] = [];
    lines.push("---Projects---");
    for (let index = 0; index < projects.length; index++) {
        const element = projects[index];
        lines.push(parseText(`${index + 1}: <glow/red>${element.name}</>`));
    }
    lines.push(" ");
    lines.push("Enter a number between 1 and " + projects.length);
    typeText(lines);
}

function showProject(...args: string[]) {
    // Allows typing "projects 1", after prompt
    let proj = "";
    if (args.length == 1) {
        proj = args[0];
    } else {
        proj = args[1];
    }

    try {
        const index = parseInt(proj) - 1;
        if (index >= projects.length) {
            throw new Error("Out of bounds");
        } else {
            typeText(projects[index].getFullText());
        }
    } catch {
        typeError("No project with that ID");
    }
}

function imageHandler() {
    createTextElement(getText("image")[0], false);
}
