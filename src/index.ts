import * as _ from "lodash";
import "./style.scss";
import { handleInput } from "./terminal";

document.addEventListener("keydown", (e) => {
  handleInput(e);
});
