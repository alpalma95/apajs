let m = (e, r) => {
  let [t, s] = e.split("|");
  return [
    t.trim(),
    s == null ? void 0 : s.split(",").map((n) => {
      let l = n.trim();
      if (/^\'|^\"|^\`/.test(l) || l === "$event")
        return l === "$event" ? l : l.slice(1, -1);
      try {
        return JSON.parse(l);
      } catch {
        return r[l];
      }
    })
  ];
}, w = (e, r, t) => {
  let [s, n] = m(r.getAttribute(e));
  if (!s in t.handlers)
    return;
  let l = t.handlers[s], i = e.slice(1);
  n ? r.addEventListener(
    i,
    (a) => n.at(0) === "$event" ? l(a, ...n.slice(1)) : l(...n)
  ) : r.addEventListener(i, l);
}, p = (e, r) => {
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
}, E = (e, r) => {
  let t = e.getAttribute("ref");
  r.$refs[t] instanceof Set ? r.$refs[t].delete(e) : delete r.$refs[t];
}, o = (e, r) => {
  e.getAttributeNames().filter((t) => t.startsWith(":") || t === "ref").forEach((t) => {
    t == "ref" && p(e, r), t.startsWith(":") && w(t, e, r);
  });
}, g = (e) => {
  let r = e.parentElement;
  for (; (r = r.parentElement) && !r.tagName.includes("-"); )
    ;
  return r;
}, N = (e) => {
  let r = (t) => {
    t.filter(
      (n) => g(n.target) == e
    ).forEach((n) => {
      if (n.type !== "childList")
        return;
      let { addedNodes: l, removedNodes: i } = n;
      i.length && i.forEach((a) => {
        !a.tagName || !a.getAttribute("ref") || E(a, e.ctx);
      }), l.length && l.forEach(async (a) => {
        a.tagName && (o(a, e.ctx), a.childNodes.length > 0 && await u(a, e.ctx));
      });
    });
  };
  return new Promise((t) => {
    t(new MutationObserver(r));
  });
}, d = (e, r) => {
  if (!e)
    return;
  const t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(n) {
      return n.getAttributeNames().some((l) => l.startsWith(":") || l === "ref") ? NodeFilter.FILTER_ACCEPT : n.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  });
  let s = t.currentNode;
  for (; s = t.nextNode(); )
    o(s, r);
  e.shadowRoot !== null && d(e.shadowRoot, r);
}, u = (e, r) => new Promise((t) => {
  d(e, r), t();
}), $ = (e, r, t = { className: HTMLElement, tag: "" }) => {
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
          watch: (s, n, l) => {
          }
        }, e.shadow && (this.shadow = this.attachShadow({ mode: e.shadow })), typeof e.onConstruct == "function" && e.onConstruct(this);
      }
      static get observedAttributes() {
        return e.observed;
      }
      connectedCallback() {
        let s = {};
        this.getAttributeNames().forEach((l) => {
          let i = this.getAttribute(l);
          try {
            s[l] = JSON.parse(i);
          } catch {
            s[l] = i;
          }
        }), this.ctx.props = s, this.ctx.handlers = {};
        let n = this.shadowRoot ?? this;
        if (n.innerHTML = r(this.ctx), !e.isStateless) {
          (async () => await u(this, this.ctx))();
          let l = {
            childList: !0,
            subtree: !0
          };
          N(this).then((i) => {
            this.shadowRoot && i.observe(this.shadowRoot, l), i.observe(this, l), this.ctx.onInit(n);
          });
        }
      }
      attributeChangedCallback(s, n, l) {
        this.ctx.watch(s, n, l);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    },
    (() => t.className !== HTMLElement ? { extends: t == null ? void 0 : t.tag } : {})()
  );
}, { isArray: b } = Array, C = (e, ...r) => {
  let t = r.map((s) => s instanceof HTMLElement ? s.outerHTML : b(s) ? s.join(" ") : s);
  return e.reduce(
    (s, n, l) => s + n + (t[l] ?? ""),
    ""
  );
}, f = null, c = /* @__PURE__ */ new WeakMap();
class y {
  constructor(r) {
    this.cb = r, this._set = /* @__PURE__ */ new Set();
  }
  unhook() {
    this._set.forEach((r) => r.delete(this));
  }
}
let A = (e) => {
  f = new y(e), f.cb();
  let r = f;
  return f = null, r;
}, R = (e, r) => {
  if (f === null)
    return;
  let t;
  c.has(e) ? t = c.get(e).get(r) : c.set(e, /* @__PURE__ */ new Map([[r, t = /* @__PURE__ */ new Set()]])), f._set.add(t), t.add(f);
}, L = (e, r) => {
  if (!c.get(e))
    return;
  c.get(e).get(r).forEach(({ cb: s }) => s());
}, T = (e) => {
  if (Array.isArray(e) || typeof e != "function" && typeof e != "object")
    return { val: e };
  if (typeof e == "function") {
    let r = h(1);
    return A(() => r.val = e()), r;
  } else
    return Object.fromEntries(
      Object.entries(e).map(([r, t]) => [
        r,
        typeof t == "object" || typeof t == "function" ? h(t) : t
      ])
    );
}, h = (e) => {
  let r = T(e);
  return new Proxy(r, {
    get(t, s, n) {
      return R(t, s), Reflect.get(t, s, n);
    },
    set(t, s, n, l) {
      return t[s] !== n && (Reflect.set(t, s, n, l), L(t, s)), !0;
    }
  });
};
export {
  $ as define,
  A as hook,
  C as html,
  h as stream
};
