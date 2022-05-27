import { IDictonary } from "./interfaces";

const languageMapper: IDictonary<string> = {
    ts: parseTextEffects("<glow/#007ACC>TypeScript</>"),
    js: parseTextEffects("<glow/#F7DF1E>JavaScript</>"),
    dart: parseTextEffects("<glow/#2CB7F6>Dart</>"),
    flutter: parseTextEffects("<glow/#2CB7F6>Flutter</>"),
    java: parseTextEffects("<glow/#EB2024>Ja</><glow/#0C8AC6>va</>"),
    python: parseTextEffects("<glow/#387AB1>Pyt</><glow/#FFD94A>hon</>"),
    c: parseTextEffects("<glow/#649AD2>C</>"),
    csharp: parseTextEffects("<glow/#953DAC>C#</>"),
    sass: parseTextEffects("<glow/#CC6698>Sass</>"),
    webpack: parseTextEffects("<glow/#8ED5FA>Webpack</>"),
    jest: parseTextEffects("<glow/#C63D14>Jest</>"),
    ghactions: parseTextEffects("<glow/#2088FF>Github Actions</>"),
};

export function parseText(str: string): string {
    // Text Effects
    str = parseTextEffects(str);

    // Hyperlinks
    str = parseHyperLinks(str);

    // Languages
    str = parseLanguages(str);

    return str;
}

function parseTextEffects(str: string): string {
    return str.replace(/<.*?>/gm, function (match) {
        if (match == "</>") {
            return "</span>";
        } else {
            let parts = match.substring(1, match.length - 1).split("/");
            let col = "";
            parts.forEach((x) => {
                // Hex codes
                if (x.includes("#")) {
                    col = x;
                    const arrays = [parts, [x]];
                    parts = arrays.reduce((a, b) =>
                        a.filter((c) => !b.includes(c))
                    );
                }
            });
            if (col == "") {
                return `<span class="${parts.join(" ")}">`;
            } else {
                return `<span class="${parts.join(" ")}" style="color:${col}">`;
            }
        }
    });
}

function parseHyperLinks(str: string): string {
    return str.replace(/\[.*?\]/gm, function (match) {
        const parts = match.substring(1, match.length - 1).split(",");
        if (parts.length == 1) {
            return `<a href="${parts[0]}">${parts[0]}</a>`;
        } else {
            return `<a href="${parts[0]}">${parts[1]}</a>`;
        }
    });
}

function parseLanguages(str: string): string {
    return str.replace(/\$.*?\$/gm, function (match) {
        const language = match.substring(1, match.length - 1);
        if (language in languageMapper) {
            return languageMapper[language];
        }
    });
}
