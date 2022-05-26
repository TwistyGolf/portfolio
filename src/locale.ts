import { getLocaleDb } from "./localeLoader";
import { parseText } from "./stringParser";

export function getText(id: string, locale = "en", parse = true): string[] {
    const localDbProper = getLocaleDb();
    let t: string[];
    try {
        t = localDbProper[id][locale];
    } catch (e) {
        console.log(`String ${id} with locale ${locale} doesn't exist`);
        throw new Error("String doesn't exist");
    }
    if (parse) {
        return t.map((x) => parseText(x));
    } else {
        return t;
    }
}
