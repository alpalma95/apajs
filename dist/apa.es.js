let m = (e, r) => {
  let [t, s] = e.split("|");
  return [
    t.trim(),
    s == null ? void 0 : s.split(",").map((l) => {
      let n = l.trim();
      if (/^\'|^\"|^\`/.test(n) || n === "$event")
        return n === "$event" ? n : n.slice(1, -1);
      try {
        return JSON.parse(n);
      } catch {
        return r[n];
      }
    })
  ];
}, p = (e, r, t) => {
  let [s, l] = m(r.getAttribute(e));
  if (!s in t.handlers)
    return;
  let n = t.handlers[s], a = e.slice(1);
  l ? r.addEventListener(
    a,
    (i) => l.at(0) === "$event" ? n(i, ...l.slice(1)) : n(...l)
  ) : r.addEventListener(a, n);
}, w = (e, r) => {
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
}, h = (e, r) => {
  e.getAttributeNames().filter((t) => t.startsWith(":") || t === "ref").forEach((t) => {
    t == "ref" && w(e, r), t.startsWith(":") && p(t, e, r);
  });
}, g = (e) => {
  let r = e.parentElement;
  for (; (r = r.parentElement) && !r.tagName.includes("-"); )
    ;
  return r;
}, N = (e) => {
  let r = (t) => {
    t.filter(
      (l) => g(l.target) == e
    ).forEach((l) => {
      if (l.type !== "childList")
        return;
      let { addedNodes: n, removedNodes: a } = l;
      a.length && a.forEach((i) => {
        !i.tagName || !i.getAttribute("ref") || E(i, e.ctx);
      }), n.length && n.forEach(async (i) => {
        i.tagName && (h(i, e.ctx), i.childNodes.length > 0 && await u(i, e.ctx));
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
    acceptNode(l) {
      return l.getAttributeNames().some((n) => n.startsWith(":") || n === "ref") ? NodeFilter.FILTER_ACCEPT : l.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  });
  let s = t.currentNode;
  for (; s = t.nextNode(); )
    h(s, r);
  e.shadowRoot !== null && d(e.shadowRoot, r);
}, u = (e, r) => new Promise((t) => {
  d(e, r), t();
}), C = (e, r, t = { className: HTMLElement, tag: "" }) => {
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
          watch: (s, l, n) => {
          },
          props: {}
        }, e.shadow && (this.shadow = this.attachShadow({ mode: e.shadow })), typeof e.onConstruct == "function" && e.onConstruct(this);
      }
      static get observedAttributes() {
        return e.observed;
      }
      connectedCallback() {
        let s = {};
        this.getAttributeNames().forEach((a) => {
          let i = this.getAttribute(a);
          try {
            s[a] = JSON.parse(i);
          } catch {
            s[a] = i;
          }
        }), this.ctx.props = s, this.ctx.handlers = {};
        let l = this.shadowRoot ?? this, n = r(this.ctx);
        if (n && (l.innerHTML = n), e.isStatic)
          this.ctx.onInit(l);
        else {
          (async () => await u(this, this.ctx))();
          let a = {
            childList: !0,
            subtree: !0
          };
          N(this).then((i) => {
            this.shadowRoot && i.observe(this.shadowRoot, a), i.observe(this, a), this.ctx.onInit(l);
          });
        }
      }
      attributeChangedCallback(s, l, n) {
        this.ctx.watch(s, l, n);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    },
    (() => t.className !== HTMLElement ? { extends: t == null ? void 0 : t.tag } : {})()
  );
}, { isArray: b } = Array, v = (e, ...r) => {
  let t = r.map((s) => s instanceof HTMLElement ? s.outerHTML : b(s) ? s.join(" ") : s);
  return e.reduce(
    (s, l, n) => s + l + (t[n] ?? ""),
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
    let r = o(1);
    return A(() => r.val = e()), r;
  } else
    return Object.fromEntries(
      Object.entries(e).map(([r, t]) => [
        r,
        typeof t == "object" || typeof t == "function" ? o(t) : t
      ])
    );
}, o = (e) => {
  let r = T(e);
  return new Proxy(r, {
    get(t, s, l) {
      return R(t, s), Reflect.get(t, s, l);
    },
    set(t, s, l, n) {
      return t[s] !== l && (Reflect.set(t, s, l, n), L(t, s)), !0;
    }
  });
};
export {
  C as define,
  A as hook,
  v as html,
  o as stream
};
