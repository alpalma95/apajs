let m = (e, r) => {
  let [t, s] = e.split("|");
  return [
    t.trim(),
    s == null ? void 0 : s.split(",").map((i) => {
      let l = i.trim();
      if (/^\'|^\"|^\`/.test(l) || l === "$event")
        return l === "$event" ? l : l.slice(1, -1);
      try {
        return JSON.parse(l);
      } catch {
        return r[l];
      }
    })
  ];
}, p = (e, r, t) => {
  let [s, i] = m(r.getAttribute(e));
  if (!s in t.handlers)
    return;
  let l = t.handlers[s], a = e.slice(1);
  i ? r.addEventListener(
    a,
    (n) => i.at(0) === "$event" ? l(n, ...i.slice(1)) : l(...i)
  ) : r.addEventListener(a, l);
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
}, b = (e) => {
  let r = e.parentElement;
  for (; (r = r.parentElement) && !(r.tagName.includes("-") || r.hasAttribute("is")); )
    ;
  return r;
}, g = (e) => {
  let r = (t) => {
    t.filter(
      (i) => b(i.target) == e
    ).forEach((i) => {
      if (i.type !== "childList")
        return;
      let { addedNodes: l, removedNodes: a } = i;
      a.length && a.forEach((n) => {
        !n.tagName || !n.getAttribute("ref") || E(n, e.ctx);
      }), l.length && l.forEach(async (n) => {
        n.tagName && (h(n, e.ctx), n.childNodes.length > 0 && await u(n, e.ctx));
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
    acceptNode(i) {
      return i.getAttributeNames().some((l) => l.startsWith(":") || l === "ref") ? NodeFilter.FILTER_ACCEPT : i.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
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
          watch: (s, i, l) => {
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
          let n = this.getAttribute(a);
          try {
            s[a] = JSON.parse(n);
          } catch {
            s[a] = n;
          }
        }), this.ctx.props = s, this.ctx.handlers = {};
        let i = this.shadowRoot ?? this, l = r(this.ctx);
        if (l && (i.innerHTML = l), e.isStatic)
          this.ctx.onInit(i);
        else {
          (async () => await u(this, this.ctx))();
          let a = {
            childList: !0,
            subtree: !0
          };
          g(this).then((n) => {
            this.shadowRoot && n.observe(this.shadowRoot, a), n.observe(this, a), this.ctx.onInit(i);
          });
        }
      }
      attributeChangedCallback(s, i, l) {
        this.ctx.watch(s, i, l);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    },
    (() => t.className !== HTMLElement ? { extends: t == null ? void 0 : t.tag } : {})()
  );
}, { isArray: N } = Array, v = (e, ...r) => {
  let t = r.map((s) => s instanceof HTMLElement ? s.outerHTML : N(s) ? s.join(" ") : s);
  return e.reduce(
    (s, i, l) => s + i + (t[l] ?? ""),
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
    get(t, s, i) {
      return R(t, s), Reflect.get(t, s, i);
    },
    set(t, s, i, l) {
      return t[s] !== i && (Reflect.set(t, s, i, l), L(t, s)), !0;
    }
  });
};
export {
  C as define,
  A as hook,
  v as html,
  o as stream
};
