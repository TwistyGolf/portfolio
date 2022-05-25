import _ from "lodash";
import { getLocaleDb } from "./localeLoader";
import { parseText } from "./stringParser";

export function getText(id: string, locale: string): string[] {
    let localDbProper = getLocaleDb();
    let t = localDbProper[id][locale];
    let ret = [];
    for (let i = 0; i < t.length; i++) {
        let str = t[i];

        str = parseText(str);

        ret.push(str);
    }

    return ret;
}
