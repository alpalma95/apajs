export let { isArray } = Array;
export let { fromEntries, entries, keys } = Object;

let addEventListener = ($target, type, event) => {
  $target.addEventListener(type.slice(1), event);
};

let setProps = ($target, props) => {
  keys(props).forEach(k => {
    if (k.startsWith("@")) {
      addEventListener($target, k, props[k]);
      return;
    }
    $target.setAttribute(k, props[k]);
  });
};

export let createElement = node => {
  if (typeof node !== "object") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  if (node.props) setProps($el, node.props);
  if (node.children) {
    node.children
      .map(child =>
        isArray(child) ? child.map(createElement) : createElement(child)
      )
      .forEach(child => {
        isArray(child)
          ? child.forEach(ch => $el.appendChild(ch))
          : $el.appendChild(child);
      });
  }
  return $el;
};
