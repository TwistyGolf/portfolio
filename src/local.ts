interface localeSignature {
  [key: string]: { [key: string]: string[] };
}

import _ from "lodash";
import localeDb from "./locale.json";

const localDbProper = <localeSignature>localeDb;
console.log(localDbProper);

export function getText(id: string, locale: string): string[] {
  let t = localDbProper[id][locale];
  let ret = [];
  for (let i = 0; i < t.length; i++) {
    let str = t[i];
    str = str.replace(/\<.*?\>/gm, function (match) {
      if (match == "</>") {
        return "</span>";
      } else {
        let parts = match.substring(1, match.length - 1).split("/");
        let col = "";
        parts.forEach((x) => {
          if (x.includes("#")) {
            col = x;
            parts = _.without(parts, x);
          }
        });
        return `<span class="${parts.join(" ")}" style="color:${col}">`;
      }
    });

    str = str.replace(/\[.*?\]/gm, function (match) {
      console.log(match);
      let parts = match.substring(1, match.length - 1).split(",");
      if (parts.length == 1) {
        return `<a href="${parts[0]}">${parts[0]}</a>`;
      } else {
        return `<a href="${parts[0]}">${parts[1]}</a>`;
      }
    });

    ret.push(str);
  }
  console.log(ret);
  return ret;
}
