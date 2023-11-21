import { isArray } from "./utils";

export let html = (strings, ...args) => {
  let transformedArgs = args.map(arg => {
    return arg instanceof HTMLElement
      ? arg.outerHTML
      : isArray(arg)
      ? arg.join(" ")
      : arg;
  });

  let content = strings.reduce(
    (acc, currentString, index) =>
      acc + currentString + (transformedArgs[index] ?? ""),
    ""
  );

  let parser = new DOMParser();
  let temp = parser.parseFromString(content, "text/html");
  let nodes = [...temp.body.childNodes];
  return nodes.length === 1 ? nodes[0] : nodes;
};
