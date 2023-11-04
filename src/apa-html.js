import htm from "htm/mini";
import van from "vanjs-core";

function h(type, props, ...children) {
  const t = van.tags[type];
  if (props) return t(props, ...children);
  return t(...children);
}

export const html = htm.bind(h);
