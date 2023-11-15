import htm from "htm/mini";
import { append, entries, isArray } from "./utils";

function parseDOM(element, attributes, ...children) {
  const newElement = document.createElement(element);
  if (attributes) {
    for (const [key, value] of entries(attributes)) {
      if (key.startsWith("on-")) {
        newElement.addEventListener(key.slice(3), value);
      } else {
        newElement.setAttribute(key, value);
      }
    }
  }
  if (children) {
    children.forEach(ch => {
      if (isArray(ch)) {
        ch.forEach(el => append(newElement, el));
        return;
      }

      if (typeof ch !== "object") {
        const text = document.createTextNode(ch);
        newElement.appendChild(text);
        return;
      }
      newElement.appendChild(ch);
    });
  }

  return newElement;
}
export const html = htm.bind(parseDOM);
