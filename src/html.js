import htm from "htm/mini";

function h(type, props, ...children) {
  return { type, props, children };
}

export const html = htm.bind(h);
