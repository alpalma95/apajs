export let html = (strings, ...args) => {
  let content = strings.reduce(
    (acc, currentString, index) => acc + currentString + (args[index] ?? ""),
    ""
  );

  let parser = new DOMParser();
  let temp = parser.parseFromString(content, "text/html");
  let nodes = [...temp.body.childNodes];
  return nodes.length === 1 ? nodes[0] : nodes;
};

// Event hydration
let getArgs = (str, ctx) => {
  let [handler, args] = str.split("|");

  return [
    handler.trim(),
    args?.split(",").map(arg => {
      let trimmedArg = arg.trim();
      if (/^\'|^\"|^\`/.test(trimmedArg) || trimmedArg === "$event") {
        return trimmedArg === "$event" ? trimmedArg : trimmedArg.slice(1, -1);
      } else {
        try {
          return JSON.parse(trimmedArg);
        } catch (_) {
          return ctx[trimmedArg];
        }
      }
    }),
  ];
};

let attachEvents = (eventString, node, ctx) => {
  let [handlerName, args] = getArgs(node.getAttribute(eventString));
  // @ts-ignore
  if (!handlerName in ctx.handlers) return;
  let handler = ctx.handlers[handlerName];
  let eventType = eventString.slice(1);
  args
    ? node.addEventListener(eventType, e =>
        args.at(0) === "$event"
          ? handler(e, ...args.slice(1))
          : handler(...args)
      )
    : node.addEventListener(eventType, handler);
};

let storeRefs = (node, ctx) => {
  let refName = node.getAttribute("ref");
  if (!refName) return;
  refName in ctx.$refs
    ? (ctx.$refs[refName] = [ctx.$refs[refName], node].flat(Infinity))
    : (ctx.$refs[refName] = node);
};

export let hydrate = (root, ctx) => {
  /** @type {TreeWalker} */

  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(node) {
      return node
        .getAttributeNames()
        .some(n => n.startsWith("@") || n === "ref")
        ? NodeFilter.FILTER_ACCEPT
        : node.tagName.includes("-")
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_SKIP;
    },
  });

  /** @type {Node} */
  let currentNode = walker.currentNode;
  while ((currentNode = walker.nextNode())) {
    // @ts-ignore

    currentNode
      // @ts-ignore
      .getAttributeNames()
      .filter(name => name.startsWith("@") || name === "ref")
      .forEach(attribute => {
        attachEvents(attribute, currentNode, ctx);
        storeRefs(currentNode, ctx);
      });
  }
  if (root.shadowRoot !== null) {
    hydrate(root.shadowRoot, ctx);
  }
};
