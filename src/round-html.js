import htm from "htm/mini";
import van from "vanjs-core";

const sanitizeProps = (obj) => {
  for (const key of Object.keys(obj)) {
    if (key.startsWith("@")) {
      obj[`on${key.slice(1)}`] = obj[key];
      delete obj[key];
    }
  }
  return obj;
};

function h(type, props, ...children) {
  let sanitizedProps = sanitizeProps({ ...props });

  const tag = van.tags[type];
  if (sanitizedProps) return tag(sanitizedProps, ...children);
  return tag(...children);
}

export const html = htm.bind(h);
