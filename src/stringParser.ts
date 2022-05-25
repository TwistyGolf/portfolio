import _ from "lodash";

export function parseText(str: string): string {
    // Text Effects
    str = str.replace(/<.*?>/gm, function (match) {
        if (match == "</>") {
            return "</span>";
        } else {
            let parts = match.substring(1, match.length - 1).split("/");
            let col = "";
            parts.forEach((x) => {
                // Hex codes
                if (x.includes("#")) {
                    col = x;
                    parts = _.without(parts, x);
                }
            });
            if (col == "") {
                return `<span class="${parts.join(" ")}">`;
            } else {
                return `<span class="${parts.join(" ")}" style="color:${col}">`;
            }
        }
    });

    // Hyperlinks
    str = str.replace(/\[.*?\]/gm, function (match) {
        const parts = match.substring(1, match.length - 1).split(",");
        if (parts.length == 1) {
            return `<a href="${parts[0]}">${parts[0]}</a>`;
        } else {
            return `<a href="${parts[0]}">${parts[1]}</a>`;
        }
    });
    return str;
}
