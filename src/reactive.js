import { state as s } from ".";
let { fromEntries: fe, entries: e } = Object;
export let reactive = (obj) =>
  typeof obj !== "object"
    ? s(obj)
    : fe(e(obj).map(([k, v]) => [k, reactive(v)]));
