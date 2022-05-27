import { getLocaleDb } from "./localeLoader";
import { parseText } from "./stringParser";

const allowedLocales = ["en"];
let currentLocale = "en";

export function changeLocale(locale: string) {
    if (locale in allowedLocales) {
        currentLocale = locale;
    }
}

export function getText(id: string, parse = true): string[] {
    const localDbProper = getLocaleDb();
    let t: string[];
    try {
        t = localDbProper[id][currentLocale];
    } catch (e) {
        console.log(`String ${id} with locale ${currentLocale} doesn't exist`);
        throw new Error("String doesn't exist");
    }
    if (parse) {
        return t.map((x) => parseText(x));
    } else {
        return t;
    }
}
