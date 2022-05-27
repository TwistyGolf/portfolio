import { parseText } from "./stringParser";

class Project {
    name: string;
    description: string;
    link: string;
    stack: string[];
    constructor(
        name: string,
        description: string,
        link: string,
        stack: string[]
    ) {
        this.name = name;
        this.description = description;
        this.link = link;
        this.stack = stack.map((x) => "$" + x + "$");
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return `Description: ${parseText(this.description)}`;
    }
    getLink() {
        return `Link: ${parseText("[" + this.link + "]")}`;
    }
    getTechStack(): string {
        return parseText(
            "Tech Stack: " + this.stack.reduce((x, y) => x + ", " + y)
        );
    }
    getFullText(): string[] {
        return [
            "---" + this.getName() + "---",
            this.getDescription(),
            this.getTechStack(),
            this.getLink(),
        ];
    }
}

export const projects = [
    new Project(
        "Terminal Portfolio",
        "The portfolio you're currently looking at",
        "https://github.com/lewis-savage/portfolio",
        ["ts", "sass", "webpack", "jest", "ghactions"]
    ),
];
