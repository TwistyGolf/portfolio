import { getLocaleDb } from "./localeLoader";
import { parseText } from "./stringParser";

export function getText(id: string, locale: string, parse = true): string[] {
    const localDbProper = getLocaleDb();
    const t = localDbProper[id][locale];
    if (parse) {
        return t.map((x) => parseText(x));
    } else {
        return t;
    }
}
