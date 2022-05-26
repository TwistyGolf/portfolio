import { getText } from "./locale";
import { parseText } from "./stringParser";
import { clearTerminal, typeError } from "./terminal";

interface CommandDictSignature {
    [key: string]: Command;
}

class Command {
    name: string;
    hidden: boolean;
    handler: (...args: string[]) => string[];
    constructor(
        name: string,
        handler: (...args: string[]) => string[],
        hidden = false
    ) {
        this.name = name;
        this.handler = handler;
        this.hidden = hidden;
    }
    call(...args: string[]) {
        return this.handler(...args);
    }
    description(locale = "en") {
        return getText(this.name + "Desc", locale);
    }
    usage(locale = "en") {
        return getText(this.name + "Usage", locale, false);
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
};

function aboutHandler(): string[] {
    return getText("about", "en");
}

function helpHandler(...args: string[]): string[] {
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
        return lines;
    } else {
        const command = args[0].trim().toLocaleLowerCase();
        if (command in commands) {
            return [`Usage: ${commands[command].usage()}`];
        } else {
            typeError(`Command '${command}' doesn't exist`);
            return [];
        }
    }
}

function educationHandler() {
    return getText("education", "en");
}

function contactHandler() {
    return getText("contact", "en");
}

function clearHandler(): string[] {
    clearTerminal();
    return [];
}

function experienceHandler() {
    return getText("experience", "en");
}

function projectsHandler(...args: string[]) {
    if (args.length == 0) {
        return getText("projects", "en");
    } else {
        try {
            return getText("project" + args[0], "en");
        } catch {
            typeError("No project with that ID");
            return [];
        }
    }
}
