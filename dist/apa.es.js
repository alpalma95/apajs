let d = (e, r) => {
  let [t, s] = e.split("|");
  return [
    t.trim(),
    s == null ? void 0 : s.split(",").map((a) => {
      let i = a.trim();
      if (/^\'|^\"|^\`/.test(i) || i === "$event")
        return i === "$event" ? i : i.slice(1, -1);
      try {
        return JSON.parse(i);
      } catch {
        return r[i];
      }
    })
  ];
}, o = (e, r, t) => {
  let [s, a] = d(r.getAttribute(e));
  if (!s in t.handlers)
    return;
  let i = t.handlers[s], n = e.slice(1);
  a ? r.addEventListener(
    n,
    (l) => a.at(0) === "$event" ? i(l, ...a.slice(1)) : i(...a)
  ) : r.addEventListener(n, i);
}, u = (e, r) => {
  let t = e.getAttribute("ref");
  if (t)
    if (t in r.$refs)
      if (r.$refs[t] instanceof HTMLElement) {
        let s = r.$refs[t];
        r.$refs[t] = /* @__PURE__ */ new Set(), r.$refs[t].add(s).add(e);
      } else
        r.$refs[t].add(e);
    else
      r.$refs[t] = e;
}, m = (e, r) => {
  let t = e.getAttribute("ref");
  r.$refs[t] instanceof Set ? r.$refs[t].delete(e) : delete r.$refs[t];
}, h = (e, r) => {
  e.getAttributeNames().filter((t) => t.startsWith(":") || t === "ref").forEach((t) => {
    t == "ref" && u(e, r), t.startsWith(":") && o(t, e, r);
  });
}, N = (e) => {
  let r = e.parentElement;
  for (; (r = r.parentElement) && !(r.tagName.includes("-") || r.hasAttribute("is")); )
    ;
  return r;
}, E = (e) => {
  let r = (t) => {
    t.filter(
      (a) => N(a.target) == e
    ).forEach((a) => {
      if (a.type !== "childList")
        return;
      let { addedNodes: i, removedNodes: n } = a;
      n.length && n.forEach((l) => {
        !l.tagName || !l.getAttribute("ref") || m(l, e.ctx);
      }), i.length && i.forEach(async (l) => {
        l.tagName && (h(l, e.ctx), l.childNodes.length > 0 && await c(l, e.ctx));
      });
    });
  };
  return new Promise((t) => {
    t(new MutationObserver(r));
  });
}, f = (e, r) => {
  if (!e)
    return;
  const t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(a) {
      return a.getAttributeNames().some((i) => i.startsWith(":") || i === "ref") ? NodeFilter.FILTER_ACCEPT : a.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  });
  let s = t.currentNode;
  for (; s = t.nextNode(); )
    h(s, r);
  e.shadowRoot !== null && f(e.shadowRoot, r);
}, c = (e, r) => new Promise((t) => {
  f(e, r), t();
}), b = (e, r, t = { className: HTMLElement, tag: "" }) => {
  window.customElements.get(e.tag) || window.customElements.define(
    e.tag,
    class extends t.className {
      constructor() {
        super(), this.ctx = {
          onInit: (s) => {
          },
          onDestroy: () => {
          },
          host: this,
          $refs: {},
          handlers: {},
          watch: (s, a, i) => {
          },
          props: {}
        }, e.shadow && (this.shadow = this.attachShadow({ mode: e.shadow })), typeof e.onConstruct == "function" && e.onConstruct(this);
      }
      static get observedAttributes() {
        return e.observed;
      }
      connectedCallback() {
        let s = {};
        this.getAttributeNames().forEach((n) => {
          let l = this.getAttribute(n);
          try {
            s[n] = JSON.parse(l);
          } catch {
            s[n] = l;
          }
        }), this.ctx.props = s, this.ctx.handlers = {};
        let a = this.shadowRoot ?? this, i = r(this.ctx);
        if (i && (a.innerHTML = i), e.isStatic)
          this.ctx.onInit(a);
        else {
          (async () => await c(this, this.ctx))();
          let n = {
            childList: !0,
            subtree: !0
          };
          E(this).then((l) => {
            this.shadowRoot && l.observe(this.shadowRoot, n), l.observe(this, n), this.ctx.onInit(a);
          });
        }
      }
      attributeChangedCallback(s, a, i) {
        this.ctx.watch(s, a, i);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    },
    (() => t.className !== HTMLElement ? { extends: t == null ? void 0 : t.tag } : {})()
  );
}, { isArray: w } = Array, A = (e, ...r) => {
  let t = r.map((s) => s instanceof HTMLElement ? s.outerHTML : w(s) ? s.join(" ") : s);
  return e.reduce(
    (s, a, i) => s + a + (t[i] ?? ""),
    ""
  );
};
export {
  b as define,
  A as html
};
