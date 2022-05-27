import { parseText } from "./stringParser";

class Skill {
    name: string;
    rating: number;
    constructor(name: string, rating: number) {
        this.name = name;
        this.rating = rating;
    }
    getRatingString(): string {
        let ratingStr;
        switch (this.rating) {
            case 1:
                ratingStr = "<glow/#FF0D0D>*</>";
                break;
            case 2:
                ratingStr = "<glow/#FF4E11>**</>";
                break;
            case 3:
                ratingStr = "<glow/#FAB733>***</>";
                break;
            case 4:
                ratingStr = "<glow/#019C01>****</>";
                break;
            case 5:
                ratingStr = "<glow/#00ff00>*****</>";
                break;
            default:
                break;
        }
        return parseText(ratingStr);
    }
}

export const skills = [
    new Skill("C#", 5),
    new Skill("Unity(Game Dev)", 5),
    new Skill("JavaScript/TypeScript", 5),
    new Skill("CSS/Sass", 4),
    new Skill("Dart/Flutter", 4),
    new Skill("Python", 4),
    new Skill("Java", 4),
    new Skill("C", 3),
];
