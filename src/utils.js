export let { isArray } = Array;
export let { fromEntries, entries, keys } = Object;

export let append = ($target, content) => {
  if (isArray(content)) {
    content.forEach(el =>
      typeof el === "string"
        ? $target.appendChild(document.createTextNode(el))
        : $target.appendChild(el)
    );
  } else {
    $target.appendChild(
      typeof content === "string" ? document.createTextNode(content) : content
    );
  }
};
