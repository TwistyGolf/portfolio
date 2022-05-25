import { getLocaleDb } from "./localeLoader";
import { parseText } from "./stringParser";

export function getText(id: string, locale: string): string[] {
    const localDbProper = getLocaleDb();
    const t = localDbProper[id][locale];
    let tw = 0;
    return t.map((x) => parseText(x));
}
