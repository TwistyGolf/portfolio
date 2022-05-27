import { getText } from "./locale";
import { parseText } from "./stringParser";
import { skills } from "./skills";

import { bindCallback, clearTerminal, typeError, typeText } from "./terminal";
import { projects } from "./projects";

interface CommandDictSignature {
    [key: string]: Command;
}

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

export const commands: CommandDictSignature = {
    about: new Command("about", aboutHandler),
    help: new Command("help", helpHandler),
    contact: new Command("contact", contactHandler),
    education: new Command("education", educationHandler),
    experience: new Command("experience", experienceHandler),
    projects: new Command("projects", projectsHandler),
    clear: new Command("clear", clearHandler),
    skills: new Command("skills", skillsHandler),
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
            showProject(x);
        });
        const lines: string[] = [];
        lines.push("---Projects---");
        for (let index = 0; index < projects.length; index++) {
            const element = projects[index];
            lines.push(parseText(`${index + 1}: <glow/red>${element.name}</>`));
        }
        lines.push(" ");
        lines.push("Enter a number between 1 and " + projects.length);
        typeText(lines);
    } else {
        showProject(args[0]);
    }
}

function showProject(indexString: string) {
    try {
        const index = parseInt(indexString) - 1;
        if (index >= projects.length) {
            throw new Error("Out of bounds");
        } else {
            typeText(projects[index].getFullText());
        }
    } catch {
        typeError("No project with that ID");
    }
}
