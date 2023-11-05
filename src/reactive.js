import { state as s } from ".";
import { fromEntries, entries } from "./utils";
export let reactive = (obj) =>
  typeof obj !== "object"
    ? s(obj)
    : fromEntries(entries(obj).map(([k, v]) => [k, reactive(v)]));
