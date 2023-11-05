import htm from "htm/mini";
import { tags } from "./van";
function h(type, props, ...children) {
  const t = tags[type];
  if (props) return t(props, ...children);
  return t(...children);
}

export const html = htm.bind(h);
