import { isArray } from "./utils";

export let html = (strings, ...args) => {
  let transformedArgs = args.map(arg => {
    return arg instanceof HTMLElement
      ? arg.outerHTML
      : isArray(arg)
      ? arg.join(" ")
      : arg;
  });

  return strings.reduce(
    (acc, currentString, index) =>
      acc + currentString + (transformedArgs[index] ?? ""),
    ""
  );
};
