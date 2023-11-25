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

  if (refName in ctx.$refs) {
    if (ctx.$refs[refName] instanceof HTMLElement) {
      let temp = ctx.$refs[refName];
      ctx.$refs[refName] = new Set();
      ctx.$refs[refName].add(temp).add(node);
    } else {
      ctx.$refs[refName].add(node);
    }
  } else {
    ctx.$refs[refName] = node;
  }
};

let processNode = (node, ctx) => {
  node
    .getAttributeNames()
    .filter(name => name.startsWith(":") || name === "ref")
    .forEach(attribute => {
      if (attribute == "ref") storeRefs(node, ctx);
      if (attribute.startsWith(":")) attachEvents(attribute, node, ctx);
    });
};

let findClosestCustomElement = node => {
  let parent = node.parentElement;
  while ((parent = parent.parentElement)) {
    if (parent.tagName.includes("-")) break;
  }
  return parent;
};

export let observeChildren = element => {
  let cb = records => {
    /**
     * Problem description:
     * Element-A is inside Element-B, so we have observerA and observerB
     * ObserverA will notice changes in Element-A and Element-B. We only want
     * observerA to react to changes on Element-A; and observerB to Element-B.
     *
     * Draft proporsal (it works although it could for sure be optimized):
     * In each record we have a target, and we can tell which is the immediate parent
     * custom element.
     * When there's a change in element B, we'll have the callback
     * triggered twice, once intercepted by observerA and intercepted again by observerB.
     * Then, we filter these records. Even though observerA will still observe
     * Element-B, since the record.target doesn't find Element-A as target's closest
     * custom element, it'll be taken out of the array (most likely leaving an
     * empty array, unless changes happen simultaneously on Elements A and B).
     */
    let filteredRecords = records.filter(
      record => findClosestCustomElement(record.target) == element
    );

    filteredRecords.forEach(record => {
      // We're only interested in observing nodes getting in and out of the DOM
      if (record.type !== "childList") return;
      let { addedNodes } = record;
      if (addedNodes.length)
        addedNodes.forEach(async node => {
          if (!node.tagName) return;
          processNode(node, element.ctx);

          if (node.childNodes.length > 0) {
            await hydrateAsync(node, element.ctx);
          }
        });
    });
  };

  return new Promise(resolve => {
    resolve(new MutationObserver(cb));
  });
};

export let hydrate = (root, ctx) => {
  /** @type {TreeWalker} */

  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(node) {
      return node
        .getAttributeNames()
        .some(n => n.startsWith(":") || n === "ref")
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
    processNode(currentNode, ctx);
  }
  if (root.shadowRoot !== null) {
    hydrate(root.shadowRoot, ctx);
  }
};

export let hydrateAsync = (root, ctx) => {
  return new Promise(resolve => {
    hydrate(root, ctx);
    resolve();
  });
};
